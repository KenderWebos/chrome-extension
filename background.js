// ============================================
// BACKGROUND SCRIPT - LOGS SIMPLES
// ============================================

// Array simple de logs en memoria
let logs = [];
const MAX_LOGS = 500;

// Inicializar
chrome.runtime.onInstalled.addListener(() => {
  addLog('🟢 FocusMan iniciado');
});

// ============================================
// EVENTOS SIMPLES
// ============================================

// Pestaña creada
chrome.tabs.onCreated.addListener((tab) => {
  const domain = getDomain(tab.url);
  addLog(`📌 Nueva pestaña abierta: ${domain}`);
});

// Pestaña activada
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (chrome.runtime.lastError) return;
    const domain = getDomain(tab.url);
    addLog(`🎯 Cambio a pestaña: ${domain}`);
  });
});

// URL cambió
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const domain = getDomain(changeInfo.url);
    addLog(`🔗 URL cambió a: ${domain}`);
  }
});

// Pestaña cerrada
chrome.tabs.onRemoved.addListener((tabId) => {
  addLog(`❌ Pestaña cerrada`);
});

// Ventana cambia de focus
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    addLog(`🪟 Cambio de ventana (ID: ${windowId})`);
  }
});

// ============================================
// FUNCIONES
// ============================================

function getDomain(url) {
  try {
    if (!url || url === 'about:blank') return 'about:blank';
    return new URL(url).hostname;
  } catch (e) {
    return 'unknown';
  }
}

function addLog(message) {
  const now = new Date();
  const time = now.toLocaleTimeString('es-ES');
  const logEntry = `[${time}] ${message}`;
  
  logs.unshift(logEntry); // Agregar al inicio
  
  // Limitar cantidad de logs
  if (logs.length > MAX_LOGS) {
    logs = logs.slice(0, MAX_LOGS);
  }

  console.log(logEntry);
}

// ============================================
// COMUNICACIÓN CON POPUP
// ============================================

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getLogs') {
    sendResponse({ logs: logs });
    return true;
  }
  
  if (request.action === 'clearLogs') {
    logs = [];
    addLog('📋 Logs limpiados');
    sendResponse({ status: 'cleared' });
    return true;
  }

  sendResponse({ error: 'unknown_action' });
  return true;
});

console.log('✅ Background script cargado');
