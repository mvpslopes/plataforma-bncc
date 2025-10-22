import { UserActivityLog, UserSession, UserAnalytics } from '../types/bncc';

class ActivityLogger {
  private static instance: ActivityLogger;
  private currentSessionId: string | null = null;

  private constructor() {
    this.currentSessionId = this.generateSessionId();
  }

  public static getInstance(): ActivityLogger {
    if (!ActivityLogger.instance) {
      ActivityLogger.instance = new ActivityLogger();
    }
    return ActivityLogger.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateLogId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getCurrentSessionId(): string {
    if (!this.currentSessionId) {
      this.currentSessionId = this.generateSessionId();
    }
    return this.currentSessionId;
  }

  private getUserAgent(): string {
    return navigator.userAgent;
  }

  private getCurrentTimestamp(): string {
    return new Date().toISOString();
  }

  public logActivity(
    userId: string,
    userName: string,
    userEmail: string,
    activity: UserActivityLog['activity'],
    resourceType?: UserActivityLog['resourceType'],
    resourceId?: string,
    resourceTitle?: string,
    details?: string
  ): void {
    const log: UserActivityLog = {
      id: this.generateLogId(),
      userId,
      userName,
      userEmail,
      activity,
      resourceType,
      resourceId,
      resourceTitle,
      details,
      timestamp: this.getCurrentTimestamp(),
      sessionId: this.getCurrentSessionId(),
      userAgent: this.getUserAgent()
    };

    // Salvar no localStorage
    const logs = this.getActivityLogs();
    logs.push(log);
    localStorage.setItem('plataforma-bncc-activity-logs', JSON.stringify(logs));

    // Atualizar sessão atual
    this.updateCurrentSession(userId, activity, resourceType);
  }

  public logLogin(userId: string, userName: string, userEmail: string): void {
    this.logActivity(userId, userName, userEmail, 'login');
    this.startNewSession(userId);
  }

  public logLogout(userId: string, userName: string, userEmail: string): void {
    this.logActivity(userId, userName, userEmail, 'logout');
    this.endCurrentSession(userId);
  }

  public logViewActivity(userId: string, userName: string, userEmail: string, activityId: string, activityTitle: string): void {
    this.logActivity(userId, userName, userEmail, 'view_activity', 'activity', activityId, activityTitle);
  }

  public logViewDocument(userId: string, userName: string, userEmail: string, documentId: string, documentTitle: string): void {
    this.logActivity(userId, userName, userEmail, 'view_document', 'document', documentId, documentTitle);
  }

  public logViewVideo(userId: string, userName: string, userEmail: string, videoId: string, videoTitle: string): void {
    this.logActivity(userId, userName, userEmail, 'view_video', 'video', videoId, videoTitle);
  }

  public logDownload(userId: string, userName: string, userEmail: string, resourceType: string, resourceId: string, resourceTitle: string): void {
    this.logActivity(userId, userName, userEmail, 'download', resourceType as any, resourceId, resourceTitle);
  }

  public logSearch(userId: string, userName: string, userEmail: string, searchTerm: string): void {
    this.logActivity(userId, userName, userEmail, 'search', undefined, undefined, undefined, `Termo: "${searchTerm}"`);
  }

  public logFilter(userId: string, userName: string, userEmail: string, filterType: string, filterValue: string): void {
    this.logActivity(userId, userName, userEmail, 'filter', undefined, undefined, undefined, `${filterType}: ${filterValue}`);
  }

  private startNewSession(userId: string): void {
    const session: UserSession = {
      id: this.getCurrentSessionId(),
      userId,
      startTime: this.getCurrentTimestamp(),
      activitiesCount: 0,
      pagesVisited: [],
      lastActivity: this.getCurrentTimestamp()
    };

    const sessions = this.getUserSessions();
    sessions.push(session);
    localStorage.setItem('plataforma-bncc-user-sessions', JSON.stringify(sessions));
  }

  private endCurrentSession(userId: string): void {
    const sessions = this.getUserSessions();
    const currentSession = sessions.find(s => s.id === this.getCurrentSessionId());
    
    if (currentSession) {
      const endTime = new Date();
      const startTime = new Date(currentSession.startTime);
      const duration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60)); // em minutos
      
      currentSession.endTime = endTime.toISOString();
      currentSession.duration = duration;
      
      localStorage.setItem('plataforma-bncc-user-sessions', JSON.stringify(sessions));
    }

    this.currentSessionId = null;
  }

  private updateCurrentSession(userId: string, activity: string, resourceType?: string): void {
    const sessions = this.getUserSessions();
    const currentSession = sessions.find(s => s.id === this.getCurrentSessionId());
    
    if (currentSession) {
      currentSession.activitiesCount++;
      currentSession.lastActivity = this.getCurrentTimestamp();
      
      // Adicionar página visitada se for uma visualização
      if (activity.includes('view') && resourceType) {
        const pageName = `${resourceType}_${activity.split('_')[1]}`;
        if (!currentSession.pagesVisited.includes(pageName)) {
          currentSession.pagesVisited.push(pageName);
        }
      }
      
      localStorage.setItem('plataforma-bncc-user-sessions', JSON.stringify(sessions));
    }
  }

  public getActivityLogs(): UserActivityLog[] {
    const logs = localStorage.getItem('plataforma-bncc-activity-logs');
    return logs ? JSON.parse(logs) : [];
  }

  public getUserSessions(): UserSession[] {
    const sessions = localStorage.getItem('plataforma-bncc-user-sessions');
    return sessions ? JSON.parse(sessions) : [];
  }

  public getActivityLogsByUser(userId: string): UserActivityLog[] {
    return this.getActivityLogs().filter(log => log.userId === userId);
  }

  public getUserSessionsByUser(userId: string): UserSession[] {
    return this.getUserSessions().filter(session => session.userId === userId);
  }

  public getUserAnalytics(userId: string): UserAnalytics | null {
    const userLogs = this.getActivityLogsByUser(userId);
    const userSessions = this.getUserSessionsByUser(userId);
    
    if (userLogs.length === 0) return null;

    const user = userLogs[0];
    const loginLogs = userLogs.filter(log => log.activity === 'login');
    const activityLogs = userLogs.filter(log => log.activity === 'view_activity');
    const documentLogs = userLogs.filter(log => log.activity === 'view_document');
    const videoLogs = userLogs.filter(log => log.activity === 'view_video');

    // Calcular tempo total gasto
    const totalTimeSpent = userSessions.reduce((total, session) => {
      return total + (session.duration || 0);
    }, 0);

    // Calcular duração média das sessões
    const completedSessions = userSessions.filter(s => s.duration);
    const averageSessionDuration = completedSessions.length > 0 
      ? totalTimeSpent / completedSessions.length 
      : 0;

    // Atividades mais visualizadas
    const activityCounts: { [key: string]: number } = {};
    activityLogs.forEach(log => {
      if (log.resourceTitle) {
        activityCounts[log.resourceTitle] = (activityCounts[log.resourceTitle] || 0) + 1;
      }
    });
    const mostViewedActivities = Object.entries(activityCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([title]) => title);

    // Documentos mais visualizados
    const documentCounts: { [key: string]: number } = {};
    documentLogs.forEach(log => {
      if (log.resourceTitle) {
        documentCounts[log.resourceTitle] = (documentCounts[log.resourceTitle] || 0) + 1;
      }
    });
    const mostViewedDocuments = Object.entries(documentCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([title]) => title);

    // Calcular frequência de login (logins por semana)
    const firstLogin = new Date(loginLogs[0]?.timestamp || Date.now());
    const lastLogin = new Date(loginLogs[loginLogs.length - 1]?.timestamp || Date.now());
    const weeksDiff = Math.max(1, Math.ceil((lastLogin.getTime() - firstLogin.getTime()) / (1000 * 60 * 60 * 24 * 7)));
    const loginFrequency = loginLogs.length / weeksDiff;

    // Calcular frequência de atividades (atividades por dia)
    const daysDiff = Math.max(1, Math.ceil((lastLogin.getTime() - firstLogin.getTime()) / (1000 * 60 * 60 * 24)));
    const activityFrequency = (activityLogs.length + documentLogs.length + videoLogs.length) / daysDiff;

    return {
      userId,
      userName: user.userName,
      userEmail: user.userEmail,
      totalSessions: userSessions.length,
      totalTimeSpent,
      totalActivities: activityLogs.length,
      totalDocuments: documentLogs.length,
      totalVideos: videoLogs.length,
      lastLogin: loginLogs[loginLogs.length - 1]?.timestamp || '',
      averageSessionDuration,
      mostViewedActivities,
      mostViewedDocuments,
      loginFrequency,
      activityFrequency
    };
  }

  public getAllUsersAnalytics(): UserAnalytics[] {
    const logs = this.getActivityLogs();
    const userIds = [...new Set(logs.map(log => log.userId))];
    
    return userIds
      .map(userId => this.getUserAnalytics(userId))
      .filter(analytics => analytics !== null) as UserAnalytics[];
  }

  public clearAllLogs(): void {
    localStorage.removeItem('plataforma-bncc-activity-logs');
    localStorage.removeItem('plataforma-bncc-user-sessions');
  }
}

export const activityLogger = ActivityLogger.getInstance();
