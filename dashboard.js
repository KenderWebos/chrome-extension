// ============================================
// DASHBOARD - VISUALIZACIÓN DE TRACKING
// ============================================

// Actualizar datos cada 2 segundos
const REFRESH_INTERVAL = 2000;

document.addEventListener('DOMContentLoaded', () => {
  console.log('Dashboard cargado - Iniciando...');
  
  // Esperar un poco a que el background script esté listo
  setTimeout(() => {
    loadDashboardData();
    setInterval(loadDashboardData, REFRESH_INTERVAL);
  }, 500);

  // Event listeners para botones
  document.getElementById('refresh-btn').addEventListener('click', loadDashboardData);
  document.getElementById('reset-btn').addEventListener('click', resetTracking);
  document.getElementById('export-btn').addEventListener('click', exportData);

  console.log('Event listeners configurados');
});

/**
 * Carga y muestra los datos del tracking
 */
function loadDashboardData() {
  chrome.runtime.sendMessage(
    { action: 'getSessionData' },
    (response) => {
      // Manejar errors
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError.message);
        console.log('Reintentando conexión...');
        // Reintentar en 1 segundo
        setTimeout(loadDashboardData, 1000);
        return;
      }

      if (response && response.stats) {
        updateStats(response.stats);
        updateDomainsList(response.stats.domainVisits);
        updateEventsList(response.sessionData.events);
      } else {
        console.warn('Respuesta vacía del background script');
      }
    }
  );
}

/**
 * Actualiza las estadísticas principales
 */
function updateStats(stats) {
  // Duración de sesión
  const hours = Math.floor(stats.sessionDuration / 3600);
  const minutes = Math.floor((stats.sessionDuration % 3600) / 60);
  const seconds = stats.sessionDuration % 60;
  const durationStr = hours > 0 
    ? `${hours}h ${minutes}m` 
    : minutes > 0 
    ? `${minutes}m ${seconds}s` 
    : `${seconds}s`;
  
  document.getElementById('session-duration').textContent = durationStr;
  document.getElementById('total-tabs').textContent = stats.totalTabsCreated;
  document.getElementById('active-tabs').textContent = stats.activeTabs;
  document.getElementById('total-events').textContent = stats.totalEvents;
}

/**
 * Actualiza la lista de dominios visitados
 */
function updateDomainsList(domainVisits) {
  const domainsList = document.getElementById('domains-list');
  
  if (Object.keys(domainVisits).length === 0) {
    domainsList.innerHTML = '<div class="text-muted">Sin datos aún</div>';
    return;
  }

  // Ordenar por más visitados
  const sorted = Object.entries(domainVisits)
    .sort((a, b) => b[1].visits - a[1].visits)
    .slice(0, 10);

  domainsList.innerHTML = sorted
    .map(([domain, data]) => `
      <div class="domain-item">
        <div class="domain-name">
          <i class="fas fa-link"></i> ${domain}
        </div>
        <div class="domain-visits">
          <strong>${data.visits}</strong> visitas
        </div>
      </div>
    `)
    .join('');
}

/**
 * Actualiza la lista de últimos eventos
 */
function updateEventsList(events) {
  const eventsList = document.getElementById('events-list');
  
  if (events.length === 0) {
    eventsList.innerHTML = '<div class="text-muted">Sin eventos</div>';
    return;
  }

  // Últimos 15 eventos
  const lastEvents = events.slice(-15).reverse();

  eventsList.innerHTML = lastEvents
    .map(event => {
      const icon = getEventIcon(event.type);
      const time = new Date(event.timestamp).toLocaleTimeString('es-ES');
      const label = getEventLabel(event);
      
      return `
        <div class="event-item">
          <div>${icon} ${label}</div>
          <div class="event-time">${time}</div>
        </div>
      `;
    })
    .join('');
}

/**
 * Obtiene el ícono según el tipo de evento
 */
function getEventIcon(eventType) {
  const icons = {
    'tab-created': '<i class="fas fa-plus-circle" style="color: #28a745;"></i>',
    'tab-activated': '<i class="fas fa-check-circle" style="color: #007bff;"></i>',
    'url-changed': '<i class="fas fa-link" style="color: #ffc107;"></i>',
    'tab-closed': '<i class="fas fa-times-circle" style="color: #dc3545;"></i>',
    'tab-status-changed': '<i class="fas fa-hourglass-half" style="color: #6c757d;"></i>',
    'window-focused': '<i class="fas fa-window-maximize" style="color: #17a2b8;"></i>'
  };
  return icons[eventType] || '<i class="fas fa-circle"></i>';
}

/**
 * Obtiene la etiqueta legible del evento
 */
function getEventLabel(event) {
  const labels = {
    'tab-created': `Pestaña creada: ${truncate(event.domain, 30)}`,
    'tab-activated': `Pestaña activa: ${truncate(event.domain, 30)}`,
    'url-changed': `URL cambió a: ${truncate(event.domain, 25)}`,
    'tab-closed': `Pestaña cerrada: ${truncate(event.domain, 30)}`,
    'tab-status-changed': `Estado: ${event.status}`,
    'window-focused': 'Ventana en foco'
  };
  return labels[event.type] || event.type;
}

/**
 * Trunca texto si es muy largo
 */
function truncate(text, length) {
  return text && text.length > length ? text.substring(0, length) + '...' : text;
}

/**
 * Limpia el tracking actual
 */
function resetTracking() {
  if (confirm('¿Estás seguro de que quieres limpiar todo el tracking?\n\nEsta acción no se puede deshacer.')) {
    chrome.runtime.sendMessage(
      { action: 'resetTracking' },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError.message);
          alert('Error al limpiar el tracking');
          return;
        }
        alert('Tracking limpiado');
        loadDashboardData();
      }
    );
  }
}

/**
 * Exporta los datos del tracking como JSON
 */
function exportData() {
  chrome.runtime.sendMessage(
    { action: 'exportData' },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError.message);
        alert('Error al exportar los datos');
        return;
      }

      if (response && response.events) {
        const dataStr = JSON.stringify(response.events, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `focusман-tracking-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('Datos exportados exitosamente');
      }
    }
  );
}
