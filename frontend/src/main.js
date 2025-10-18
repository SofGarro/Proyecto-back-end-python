
import './style.css';

console.log("ParkEase frontend cargado");



// -------------------- CONFIG --------------------
const API_URL = "https://vkhyhzumlwcqtfhlcybs.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZraHloenVtbHdjcXRmaGxjeWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDQyMjUsImV4cCI6MjA3NjE4MDIyNX0.ZO_ksFPpjYmPrBA6KgPOitefuB5KHyE0A1dzvPNlkN8"; // reemplaza con tu API key anónima


const headers = {
  "apikey": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZraHloenVtbHdjcXRmaGxjeWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDQyMjUsImV4cCI6MjA3NjE4MDIyNX0.ZO_ksFPpjYmPrBA6KgPOitefuB5KHyE0A1dzvPNlkN8,
  "Authorization": `Bearer $eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZraHloenVtbHdjcXRmaGxjeWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDQyMjUsImV4cCI6MjA3NjE4MDIyNX0.ZO_ksFPpjYmPrBA6KgPOitefuB5KHyE0A1dzvPNlkN8`,
  "Content-Type": "application/json"
};


// -------------------- PARQUEOS --------------------
const parqueoForm = document.getElementById("parqueoForm");
if (parqueoForm) {
  parqueoForm.addEventListener("submit", async e => {
    e.preventDefault();
    const parqueo = {
      nombre: document.getElementById("nombre").value,
      nivel: Number(document.getElementById("nivel").value),
      tarifa: Number(document.getElementById("tarifa").value),
      aforo: Number(document.getElementById("aforo").value)
    };
    await fetch(`$https://vkhyhzumlwcqtfhlcybs.supabase.co/parqueos`, {
      method: "POST",
      headers,
      body: JSON.stringify(parqueo)
    });
    alert("Parqueo registrado");
    parqueoForm.reset();
    cargarParqueos();
  });
}


// Listar parqueos
async function cargarParqueos() {
  const lista = document.getElementById("listaParqueos");
  if (!lista) return;


  const res = await fetch(`$https://vkhyhzumlwcqtfhlcybs.supabase.co/parqueos`, { headers });
  const data = await res.json();
  lista.innerHTML = "";
  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow";
    div.innerHTML = `<h3 class="font-semibold">${p.nombre}</h3>
                     <p>Nivel: ${p.nivel}</p>
                     <p>Tarifa: $${p.tarifa}</p>
                     <p>Aforo: ${p.aforo}</p>`;
    lista.appendChild(div);
  });
}
cargarParqueos();


// -------------------- RESERVAS --------------------
const reservaForm = document.getElementById("reservaForm");
if (reservaForm) {
  reservaForm.addEventListener("submit", async e => {
    e.preventDefault();
    const reserva = {
      parqueo: document.getElementById("parqueo").value,
      usuario: document.getElementById("usuario").value,
      fecha: document.getElementById("fecha").value,
      tipo: document.getElementById("tipo").value
    };
    await fetch(`$https://vkhyhzumlwcqtfhlcybs.supabase.co/reservas`, {
      method: "POST",
      headers,
      body: JSON.stringify(reserva)
    });
    alert("Reserva creada");
    reservaForm.reset();
    cargarReservas();
  });
}


async function cargarReservas() {
  const lista = document.getElementById("listaReservas");
  if (!lista) return;
  const res = await fetch(`$https://vkhyhzumlwcqtfhlcybs.supabase.co/reservas`, { headers });
  const data = await res.json();
  lista.innerHTML = "";
  data.forEach(r => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow mb-2";
    div.innerHTML = `<strong>${r.usuario}</strong> - ${r.parqueo} - ${r.fecha} (${r.tipo})`;
    lista.appendChild(div);
  });
}
cargarReservas();


// -------------------- ACCESOS --------------------
const accesoForm = document.getElementById("accesoForm");
if (accesoForm) {
  accesoForm.addEventListener("submit", async e => {
    e.preventDefault();
    const acceso = {
      placa: document.getElementById("placa").value || null,
      qr: document.getElementById("qr").value || null,
      fecha: new Date().toISOString()
    };
    await fetch(`$https://vkhyhzumlwcqtfhlcybs.supabase.co/accesos`, {
      method: "POST",
      headers,
      body: JSON.stringify(acceso)
    });
    alert("Acceso registrado");
    accesoForm.reset();
    cargarAccesos();
  });
}


async function cargarAccesos() {
  const lista = document.getElementById("listaAccesos");
  if (!lista) return;
  const res = await fetch(`$https://vkhyhzumlwcqtfhlcybs.supabase.co/accesos`, { headers });
  const data = await res.json();
  lista.innerHTML = "";
  data.forEach(a => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow mb-2";
    div.innerHTML = `<p>Placa: ${a.placa || "N/A"} | QR: ${a.qr || "N/A"} | Fecha: ${a.fecha}</p>`;
    lista.appendChild(div);
  });
}
cargarAccesos();


// -------------------- PAGOS --------------------
const pagoForm = document.getElementById("pagoForm");
if (pagoForm) {
  pagoForm.addEventListener("submit", async e => {
    e.preventDefault();
    const pago = {
      reserva_id: document.getElementById("reservaId").value,
      monto: Number(document.getElementById("monto").value),
      metodo: document.getElementById("metodo").value,
      fecha: new Date().toISOString()
    };
    await fetch(`$https://vkhyhzumlwcqtfhlcybs.supabase.co/pagos`, {
      method: "POST",
      headers,
      body: JSON.stringify(pago)
    });
    alert("Pago procesado");
    pagoForm.reset();
    cargarPagos();
  });
}


async function cargarPagos() {
  const lista = document.getElementById("comprobantes");
  if (!lista) return;
  const res = await fetch(`$https://vkhyhzumlwcqtfhlcybs.supabase.co/pagos`, { headers });
  const data = await res.json();
  lista.innerHTML = "";
  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow mb-2";
    div.innerHTML = `<p>Reserva: ${p.reserva_id} | Monto: $${p.monto} | Método: ${p.metodo} | Fecha: ${p.fecha}</p>`;
    lista.appendChild(div);
  });
}
cargarPagos();


// -------------------- NOTIFICACIONES --------------------
const notiForm = document.getElementById("notificacionForm");
if (notiForm) {
  notiForm.addEventListener("submit", async e => {
    e.preventDefault();
    const noti = {
      mensaje: document.getElementById("mensaje").value,
      fecha: document.getElementById("fecha").value
    };
    await fetch(`$https://vkhyhzumlwcqtfhlcybs.supabase.co/notificaciones`, {
      method: "POST",
      headers,
      body: JSON.stringify(noti)
    });
    alert("Notificación enviada");
    notiForm.reset();
    cargarNotificaciones();
  });
}


async function cargarNotificaciones() {
  const lista = document.getElementById("listaNotificaciones");
  if (!lista) return;
  const res = await fetch(`$https://vkhyhzumlwcqtfhlcybs.supabase.co/notificaciones`, { headers });
  const data = await res.json();
  lista.innerHTML = "";
  data.forEach(n => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow mb-2";
    div.innerHTML = `<p>${n.mensaje} | Fecha: ${n.fecha}</p>`;
    lista.appendChild(div);
  });
}
cargarNotificaciones();


// -------------------- MONITOREO --------------------
async function cargarMonitoreo() {
  const container = document.getElementById("tableroMonitoreo");
  if (!container) return;
  const res = await fetch(`$https://vkhyhzumlwcqtfhlcybs.supabase.co/parqueos`, { headers });
  const data = await res.json();
  container.innerHTML = "";
  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow";
    div.innerHTML = `<h3 class="font-semibold">${p.nombre}</h3>
                     <p>Aforo: ${p.aforo}</p>
                     <p>Ocupación actual: ${p.ocupacion || 0}</p>`;
    container.appendChild(div);
  });
}
cargarMonitoreo();


// -------------------- REPORTES --------------------
async function cargarReportes() {
  const container = document.getElementById("reportesContainer");
  if (!container) return;
  const res = await fetch(`$https://vkhyhzumlwcqtfhlcybs.supabase.co/reportes`, { headers });
  const data = await res.json();
  container.innerHTML = "";
  data.forEach(r => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow";
    div.innerHTML = `<h3 class="font-semibold">${r.tipo}</h3>
                     <p>${r.detalle}</p>`;
    container.appendChild(div);
  });
}
cargarReportes();



