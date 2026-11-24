// ============================================
// LOGS POPUP - VISUALIZACIÓN SIMPLE
// ============================================

const logsList = document.getElementById('logs-list');
const refreshBtn = document.getElementById('refresh-btn');
const clearBtn = document.getElementById('clear-btn');

document.addEventListener('DOMContentLoaded', () => {
  loadLogs();
  refreshBtn.addEventListener('click', loadLogs);
  clearBtn.addEventListener('click', clearLogs);
  
  // Auto-refresh cada segundo
  setInterval(loadLogs, 1000);
});

function loadLogs() {
  chrome.runtime.sendMessage(
    { action: 'getLogs' },
    (response) => {
      if (chrome.runtime.lastError) {
        logsList.innerHTML = '<div class="empty">❌ Error: No se pudo conectar</div>';
        return;
      }

      if (response && response.logs && response.logs.length > 0) {
        logsList.innerHTML = response.logs
          .map(log => `<div class="log-entry">${escapeHtml(log)}</div>`)
          .join('');
        
        // Auto-scroll al inicio (logs más nuevos)
        logsList.scrollTop = 0;
      } else {
        logsList.innerHTML = '<div class="empty">✨ Sin logs aún</div>';
      }
    }
  );
}

function clearLogs() {
  if (confirm('¿Limpiar todos los logs?')) {
    chrome.runtime.sendMessage(
      { action: 'clearLogs' },
      (response) => {
        if (chrome.runtime.lastError) {
          alert('Error al limpiar logs');
          return;
        }
        loadLogs();
      }
    );
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
