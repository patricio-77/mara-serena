import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";

const LOGO = "data:image/png;base64,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";

const COLORS = {
  nude:"#E8D5C8", nudeLight:"#F5EDE6", nudePale:"#FAF5F1",
  sage:"#8FAF8A", sageDark:"#6D8F68", sageLight:"#B8CEB5", sagePale:"#EBF1EA",
  ink:"#2C2420", inkMid:"#6B5C56", inkLight:"#A89890",
  border:"#DDD0C8", white:"#FFFFFF",
  success:"#7BA68A", warning:"#C8A46A", danger:"#B86060",
};

const S = {
  app:{ fontFamily:"'Playfair Display',Georgia,serif", backgroundColor:"#FAF5F1", minHeight:"100vh", maxWidth:430, margin:"0 auto" },
  header:{ padding:"52px 24px 22px", background:"linear-gradient(180deg,#C8DBC5 0%,#F5EDE6 100%)", borderBottom:"1px solid #DDD0C8", position:"relative", overflow:"hidden" },
  hAccent:{ position:"absolute", top:-20, right:-20, width:120, height:120, borderRadius:"50%", background:"#8FAF8A18" },
  hTitle:{ fontSize:26, color:"#2C2420", fontWeight:700, margin:0 },
  hSub:{ fontSize:12, color:"#A89890", margin:"4px 0 0", fontFamily:"'Raleway',sans-serif", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:500 },
  card:{ backgroundColor:"#FFFFFF", borderRadius:16, padding:20, marginBottom:12, boxShadow:"0 2px 16px rgba(44,36,32,0.06)", border:"1px solid #DDD0C8" },
  btnP:{ backgroundColor:"#8FAF8A", color:"#FFFFFF", border:"none", borderRadius:50, padding:"14px 32px", fontSize:13, fontFamily:"'Raleway',sans-serif", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", width:"100%" },
  btnS:{ backgroundColor:"transparent", color:"#2C2420", border:"1.5px solid #DDD0C8", borderRadius:50, padding:"13px 24px", fontSize:13, fontFamily:"'Raleway',sans-serif", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" },
  btnD:{ backgroundColor:"transparent", color:"#B86060", border:"1.5px solid #B86060", borderRadius:50, padding:"11px 20px", fontSize:12, fontFamily:"'Raleway',sans-serif", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" },
  inp:{ width:"100%", border:"1.5px solid #DDD0C8", borderRadius:12, padding:"14px 16px", fontSize:15, fontFamily:"'Raleway',sans-serif", color:"#2C2420", backgroundColor:"#FFFFFF", outline:"none", boxSizing:"border-box" },
  lbl:{ fontSize:10, color:"#A89890", fontFamily:"'Raleway',sans-serif", letterSpacing:"0.16em", textTransform:"uppercase", fontWeight:700, display:"block", marginBottom:8 },
  nav:{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, backgroundColor:"#FFFFFF", borderTop:"1px solid #DDD0C8", display:"flex", justifyContent:"space-around", padding:"12px 0 22px", zIndex:100 },
};

const navBtn = (active) => ({ display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", color:active?"#8FAF8A":"#A89890", fontSize:10, fontFamily:"'Raleway',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:active?700:500 });

const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Raleway:wght@300;400;500;600;700;800&family=Montserrat:wght@400;600;700&display=swap');
    .marca { font-family: 'Montserrat','Trebuchet MS',Arial,sans-serif !important; font-weight:700 !important; }
  `}</style>
);

const IcoSVG = ({ name, size=22, color="currentColor" }) => {
  const attr = { fill:"none", stroke:color, strokeWidth:"1.8", strokeLinecap:"round", strokeLinejoin:"round" };
  if(name==="calendar") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  if(name==="home") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
  if(name==="user") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  if(name==="users") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  if(name==="check") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><polyline points="20 6 9 17 4 12"/></svg>;
  if(name==="clock") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
  if(name==="edit") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
  if(name==="back") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><polyline points="15 18 9 12 15 6"/></svg>;
  if(name==="chevron") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><polyline points="9 18 15 12 9 6"/></svg>;
  if(name==="leaf") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><path d="M17 8C8 10 5.9 16.17 3.82 19.43L5.71 21l1-1.07A4.67 4.67 0 008 21c9 0 15-9 11-18A13.5 13.5 0 013 3c0 9 4 15 13 18"/></svg>;
  if(name==="info") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
  if(name==="wa") return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
  return null;
};

const Badge = ({ estado }) => {
  const map = {
    confirmado:{ bg:"#EBF1EA", text:"#6D8F68", label:"Confirmado" },
    pendiente: { bg:"#FBF3E4", text:"#C8A46A", label:"Pendiente"  },
    cancelado: { bg:"#FAE8E8", text:"#B86060", label:"Cancelado"  },
    libre:     { bg:"#F5EDE6", text:"#6B5C56", label:"Disponible" },
  };
  const st = map[estado] || map.pendiente;
  return <span style={{ display:"inline-block", padding:"3px 12px", borderRadius:50, fontSize:11, fontFamily:"'Raleway',sans-serif", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", backgroundColor:st.bg, color:st.text }}>{st.label}</span>;
};

const DISPONIBLES = [
  { fecha:"Lun 19 may", slots:["09:00","10:00","15:00","16:00"] },
  { fecha:"Mar 20 may", slots:["09:00","11:00","14:00"] },
  { fecha:"Mie 21 may", slots:["10:00","11:00","16:00","17:00"] },
  { fecha:"Jue 22 may", slots:["09:00","15:00"] },
  { fecha:"Vie 23 may", slots:["10:00","14:00","15:00"] },
  { fecha:"Lun 26 may", slots:["09:00","10:00","14:00"] },
  { fecha:"Mar 27 may", slots:["11:00","15:00","16:00"] },
  { fecha:"Mie 28 may", slots:["09:00","10:00","17:00"] },
];

const formatFecha = (fecha) => {
  if(!fecha) return "";
  if(fecha.includes("-") && fecha.length === 10) {
    const [anio, mes, dia] = fecha.split("-");
    return dia + "/" + mes;
  }
  return fecha;
};

const formatHora = (hora) => {
  if(!hora) return "";
  return hora.slice(0, 5);
};

function Login({ onLogin }) {
  const [paso, setPaso] = useState(1);
  const [cel, setCel] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [load, setLoad] = useState(false);

  const verificarCelular = async () => {
    if(cel.length < 8) return;
    setLoad(true);
    const { data } = await supabase.from("pacientes").select("*").eq("celular", cel).single();
    setLoad(false);
    if(data) { onLogin("paciente", data); }
    else { setPaso(2); }
  };

  const completarPerfil = async () => {
    if(nombre.length < 2 || apellido.length < 2) return;
    setLoad(true);
    const { data, error } = await supabase.from("pacientes").insert([{ nombre, apellido, celular: cel }]).select().single();
    setLoad(false);
    if(!error) onLogin("paciente", data);
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(180deg,#C8DBC5 0%,#F5EDE6 100%)", display:"flex", flexDirection:"column", justifyContent:"center", padding:"32px 28px" }}>
      <Fonts/>
      <div style={{ textAlign:"center", marginBottom:44 }}>
        <div style={{ width:100, height:100, borderRadius:"50%", background:"#6D8F68", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", boxShadow:"0 4px 24px rgba(44,36,32,0.15)" }}>
          <img src={LOGO} width={68} height={68} alt="logo" style={{ objectFit:"contain" }}/>
        </div>
        <h1 className="marca" style={{ fontSize:30, color:"#2C2420", margin:0 }}>Mara Serena</h1>
        <p style={{ color:"#6B5C56", fontSize:13, margin:"5px 0 0", fontFamily:"'Raleway',sans-serif", letterSpacing:"0.18em", textTransform:"uppercase" }}>Dermocosmética</p>
      </div>
      <div style={{...S.card, padding:"28px 24px"}}>
        {paso===1 && <>
          <h2 style={{ fontSize:21, color:"#2C2420", fontWeight:600, margin:"0 0 6px" }}>Ingresá tu celular</h2>
          <p style={{ fontSize:13, color:"#A89890", margin:"0 0 24px", fontFamily:"'Raleway',sans-serif", lineHeight:1.6 }}>Ingresá tu número para acceder a tu cuenta.</p>
          <label style={{...S.lbl}}>Número de WhatsApp</label>
          <div style={{ display:"flex", gap:8, marginBottom:20 }}>
            <div style={{...S.inp, width:64, flexShrink:0, textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", color:"#6B5C56" }}>+54</div>
            <input style={{...S.inp}} placeholder="9 11 1234-5678" value={cel} onChange={e=>setCel(e.target.value)} type="tel"/>
          </div>
          <button style={{...S.btnP}} onClick={verificarCelular} disabled={load||cel.length<8}>
            {load ? "Verificando..." : "Ingresar"}
          </button>
        </>}
        {paso===2 && <>
          <button onClick={()=>setPaso(1)} style={{ background:"none", border:"none", cursor:"pointer", color:"#A89890", display:"flex", alignItems:"center", gap:4, marginBottom:18, padding:0 }}>
            <IcoSVG name="back" size={15} color="#A89890"/><span style={{ fontFamily:"'Raleway',sans-serif", fontSize:12 }}>Cambiar número</span>
          </button>
          <h2 style={{ fontSize:21, color:"#2C2420", fontWeight:600, margin:"0 0 6px" }}>Bienvenida!</h2>
          <p style={{ fontSize:13, color:"#A89890", margin:"0 0 24px", fontFamily:"'Raleway',sans-serif", lineHeight:1.6 }}>Completá tus datos para registrarte.</p>
          <label style={{...S.lbl}}>Nombre</label>
          <input style={{...S.inp, marginBottom:16}} placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)}/>
          <label style={{...S.lbl}}>Apellido</label>
          <input style={{...S.inp, marginBottom:20}} placeholder="Apellido" value={apellido} onChange={e=>setApellido(e.target.value)}/>
          <button style={{...S.btnP}} onClick={completarPerfil} disabled={load||nombre.length<2||apellido.length<2}>
            {load ? "Guardando..." : "Comenzar"}
          </button>
        </>}
      </div>
      <button onClick={()=>onLogin("admin", null)} style={{ background:"none", border:"none", cursor:"pointer", color:"#A89890", fontSize:11, fontFamily:"'Raleway',sans-serif", marginTop:28, textDecoration:"underline" }}>Acceso administración</button>
    </div>
  );
}

function TurnosDisponibles({ paciente }) {
  const [dIdx, setDIdx] = useState(null);
  const [horaSelec, setHoraSelec] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [ok, setOk] = useState(false);
  const [load, setLoad] = useState(false);

  const confirmar = async () => {
    if(!horaSelec) return;
    setLoad(true);
    await supabase.from("turnos").insert([{
      paciente_id: paciente?.id || null,
      fecha: DISPONIBLES[dIdx]?.fecha,
      hora: horaSelec,
      estado: "pendiente",
      mensaje: mensaje || null
    }]);
    setLoad(false);
    setOk(true);
  };

  if(ok) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center", background:"linear-gradient(160deg,#EBF1EA 0%,#FAF5F1 100%)" }}>
      <Fonts/>
      <div style={{ width:88, height:88, borderRadius:"50%", background:"#EBF1EA", border:"2px solid #8FAF8A", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
        <IcoSVG name="check" size={40} color="#8FAF8A"/>
      </div>
      <h2 style={{ fontSize:28, color:"#2C2420", fontWeight:600, margin:"0 0 8px" }}>Turno reservado!</h2>
      <p style={{ fontSize:15, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", lineHeight:1.7, margin:"0 0 16px" }}>
        <strong style={{ color:"#2C2420" }}>{DISPONIBLES[dIdx]?.fecha} - {formatHora(horaSelec)} hs</strong>
      </p>
      <div style={{...S.card, maxWidth:300, margin:"0 0 24px", textAlign:"left"}}>
        <p style={{ fontSize:12, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", margin:"0 0 10px", fontWeight:600 }}>Recordá estas indicaciones:</p>
        {["Llegar sin maquillaje ni base","No aplicar cremas el dia del turno","Avisanos si tomas alguna medicacion","Si no podes asistir comunicarte con nosotros"].map((item,i)=>(
          <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"#8FAF8A", marginTop:5, flexShrink:0 }}/>
            <p style={{ fontSize:12, color:"#6B5C56", margin:0, fontFamily:"'Raleway',sans-serif", lineHeight:1.5 }}>{item}</p>
          </div>
        ))}
        <p style={{ fontSize:11, color:"#A89890", fontFamily:"'Raleway',sans-serif", margin:"12px 0 0" }}>48 hs antes te enviamos un recordatorio.</p>
      </div>
      <button style={{...S.btnP}} onClick={()=>{setOk(false);setDIdx(null);setHoraSelec(null);setMensaje("");}}>Reservar otro turno</button>
    </div>
  );

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <h1 style={{...S.hTitle}}>Turnos disponibles</h1>
          <p style={{...S.hSub}}>Proximos 6 meses</p>
        </div>
      </div>
      <div style={{ padding:"20px" }}>
        <p style={{ fontSize:14, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", margin:"0 0 16px" }}>Elegi el dia y horario:</p>
        {DISPONIBLES.map((dia, idx) => (
          <div key={idx} style={{ marginBottom:16 }}>
            <p style={{...S.lbl, marginBottom:8}}>{dia.fecha}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {dia.slots.map(hora => {
                const sel = dIdx===idx && horaSelec===hora;
                return (
                  <button key={hora} onClick={()=>{setDIdx(idx);setHoraSelec(hora);}} style={{ padding:"10px 20px", borderRadius:50, border: sel ? "1.5px solid #8FAF8A" : "1.5px solid #DDD0C8", background: sel ? "#8FAF8A" : "#fff", color: sel ? "#fff" : "#2C2420", fontSize:13, fontFamily:"'Raleway',sans-serif", cursor:"pointer", fontWeight:600 }}>{hora}</button>
                );
              })}
            </div>
          </div>
        ))}
        {horaSelec && (
          <div style={{...S.card, background:"#EBF1EA", border:"1px solid #B8CEB5", marginTop:8}}>
            <p style={{...S.lbl, color:"#6D8F68", marginBottom:4}}>Turno seleccionado</p>
            <p style={{ fontSize:15, color:"#2C2420", margin:"0 0 16px", fontWeight:600 }}>{DISPONIBLES[dIdx]?.fecha} - {formatHora(horaSelec)} hs</p>
            <label style={{...S.lbl}}>Mensaje para Mara <span style={{ color:"#B8CEB5" }}>(opcional)</span></label>
            <textarea style={{...S.inp, resize:"none", height:80, fontSize:14, lineHeight:1.5}} placeholder="Ej: queria consultar sobre un tratamiento..." value={mensaje} onChange={e=>setMensaje(e.target.value)}/>
            <button style={{...S.btnP, marginTop:16}} onClick={confirmar} disabled={load}>{load?"Guardando...":"Confirmar reserva"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function MisTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [det, setDet] = useState(null);

  useEffect(() => {
    supabase.from("turnos").select("*").then(({ data }) => { if(data) setTurnos(data); });
  }, []);

  if(det) return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, display:"flex", alignItems:"center", gap:14}}>
        <div style={{...S.hAccent}}/>
        <button onClick={()=>setDet(null)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, zIndex:1 }}><IcoSVG name="back" size={20} color="#2C2420"/></button>
        <div style={{ zIndex:1 }}><h1 style={{...S.hTitle}}>Detalle del turno</h1></div>
      </div>
      <div style={{ padding:20 }}>
        <div style={{...S.card}}>
          <Badge estado={det.estado}/>
          <h2 style={{ fontSize:22, color:"#2C2420", fontWeight:600, margin:"12px 0 0" }}>{formatFecha(det.fecha)}</h2>
          <div style={{ height:1, background:"#DDD0C8", margin:"16px 0" }}/>
          <div style={{ display:"flex", gap:24 }}>
            <div><p style={{...S.lbl}}>Fecha</p><p style={{ fontSize:15, color:"#2C2420", margin:0, fontFamily:"'Raleway',sans-serif", fontWeight:600 }}>{formatFecha(det.fecha)}</p></div>
            <div><p style={{...S.lbl}}>Hora</p><p style={{ fontSize:15, color:"#2C2420", margin:0, fontFamily:"'Raleway',sans-serif", fontWeight:600 }}>{formatHora(det.hora)} hs</p></div>
          </div>
        </div>
        {det.estado !== "cancelado" && <button style={{...S.btnD, width:"100%", marginTop:4}}>Cancelar turno</button>}
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}><div style={{...S.hAccent}}/><div style={{ position:"relative", zIndex:1 }}><h1 style={{...S.hTitle}}>Mis turnos</h1><p style={{...S.hSub}}>Tus citas</p></div></div>
      <div style={{ padding:20 }}>
        {turnos.length === 0 ? (
          <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:40 }}>No tenes turnos reservados</p>
        ) : turnos.map(trn => (
          <div key={trn.id} style={{...S.card, cursor:"pointer"}} onClick={()=>setDet(trn)}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div style={{ flex:1, paddingRight:12 }}><Badge estado={trn.estado}/><h3 style={{ fontSize:16, color:"#2C2420", fontWeight:600, margin:"10px 0 4px" }}>{formatFecha(trn.fecha)}</h3></div>
              <div style={{ textAlign:"right" }}><p style={{ fontSize:16, color:"#2C2420", fontWeight:700, margin:"0 0 2px", fontFamily:"'Raleway',sans-serif" }}>{formatHora(trn.hora)} hs</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminTurnos() {
  const [sel, setSel] = useState(null);
  const [turnos, setTurnos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [load, setLoad] = useState(true);

  useEffect(() => {
    supabase.from("turnos").select("*, pacientes(nombre, apellido, celular)").order("fecha").order("hora").then(({ data }) => {
      if(data) setTurnos(data);
      setLoad(false);
    });
  }, []);

  const lista = filtro==="todos" ? turnos : turnos.filter(trn => trn.estado === filtro);
  const porFecha = lista.reduce((acc, trn) => { (acc[trn.fecha] = acc[trn.fecha] || []).push(trn); return acc; }, {});
  const conf = turnos.filter(trn => trn.estado==="confirmado").length;
  const pend = turnos.filter(trn => trn.estado==="pendiente").length;

  if(sel) return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, display:"flex", alignItems:"center", gap:14}}>
        <div style={{...S.hAccent}}/>
        <button onClick={()=>setSel(null)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, zIndex:1 }}><IcoSVG name="back" size={20} color="#2C2420"/></button>
        <div style={{ zIndex:1 }}><h1 style={{...S.hTitle}}>{formatFecha(sel.fecha)} - {formatHora(sel.hora)}</h1><p style={{...S.hSub}}>Detalle</p></div>
      </div>
      <div style={{ padding:20 }}>
        <div style={{...S.card}}>
          <Badge estado={sel.estado}/>
          <h2 style={{ fontSize:22, color:"#2C2420", fontWeight:600, margin:"12px 0 4px" }}>{sel.pacientes ? sel.pacientes.nombre + " " + sel.pacientes.apellido : "Sin paciente"}</h2>
          {sel.pacientes && <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8 }}><IcoSVG name="wa" size={16} color="#8FAF8A"/><span style={{ fontSize:14, color:"#A89890", fontFamily:"'Raleway',sans-serif" }}>{sel.pacientes.celular}</span></div>}
          {sel.mensaje && <div style={{ marginTop:16, padding:12, background:"#F5EDE6", borderRadius:12 }}><p style={{...S.lbl, marginBottom:4}}>Mensaje de la paciente</p><p style={{ fontSize:13, color:"#6B5C56", margin:0, fontFamily:"'Raleway',sans-serif" }}>{sel.mensaje}</p></div>}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button style={{...S.btnS, flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6}}><IcoSVG name="edit" size={14} color="#2C2420"/> Editar</button>
          <button style={{...S.btnD, flex:1}}>Cancelar</button>
        </div>
        <div style={{...S.card, marginTop:12, textAlign:"center"}}>
          <p style={{...S.lbl}}>Recordatorio manual</p>
          <button style={{...S.btnS, display:"inline-flex", alignItems:"center", gap:8, marginTop:8}}><IcoSVG name="wa" size={15} color="#2C2420"/> WhatsApp</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}><h1 style={{...S.hTitle}}>Todos los turnos</h1><p style={{...S.hSub}}>Agenda completa</p></div>
      </div>
      <div style={{ padding:"16px 20px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
          {[{lbl:"Total",val:turnos.length,color:"#2C2420"},{lbl:"Confirmados",val:conf,color:"#7BA68A"},{lbl:"Pendientes",val:pend,color:"#C8A46A"}].map(st=>(
            <div key={st.lbl} style={{...S.card, padding:"14px 10px", textAlign:"center", marginBottom:0}}>
              <p style={{ fontSize:26, color:st.color, margin:0, fontFamily:"'Raleway',sans-serif", fontWeight:800 }}>{st.val}</p>
              <p style={{ fontSize:9, color:"#A89890", margin:"2px 0 0", fontFamily:"'Raleway',sans-serif", textTransform:"uppercase", letterSpacing:"0.08em" }}>{st.lbl}</p>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:16, overflowX:"auto", paddingBottom:4 }}>
          {[{val:"todos",lbl:"Todos"},{val:"confirmado",lbl:"Confirmados"},{val:"pendiente",lbl:"Pendientes"}].map(filtItem=>(
            <button key={filtItem.val} onClick={()=>setFiltro(filtItem.val)} style={{ flexShrink:0, padding:"7px 16px", borderRadius:50, border: filtro===filtItem.val ? "1.5px solid #8FAF8A" : "1.5px solid #DDD0C8", background: filtro===filtItem.val ? "#8FAF8A" : "#fff", color: filtro===filtItem.val ? "#fff" : "#6B5C56", fontSize:12, fontFamily:"'Raleway',sans-serif", fontWeight:600, cursor:"pointer" }}>{filtItem.lbl}</button>
          ))}
        </div>
        {load ? <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:40 }}>Cargando...</p>
        : Object.keys(porFecha).length === 0 ? <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:40 }}>No hay turnos</p>
        : Object.entries(porFecha).map(([fecha, trns]) => (
          <div key={fecha} style={{ marginBottom:8 }}>
            <p style={{...S.lbl, marginBottom:8}}>{formatFecha(fecha)}</p>
            {trns.map(trn => (
              <div key={trn.id} style={{...S.card, cursor:"pointer", display:"flex", alignItems:"center", gap:12, padding:"14px 16px", marginBottom:8}} onClick={()=>setSel(trn)}>
                <p style={{ fontSize:14, color:"#2C2420", fontWeight:700, margin:0, fontFamily:"'Raleway',sans-serif", minWidth:44 }}>{formatHora(trn.hora)}</p>
                <div style={{ width:1, height:32, background:"#DDD0C8" }}/>
                <div style={{ flex:1 }}>
                  {trn.pacientes ? <><p style={{ fontSize:14, color:"#2C2420", margin:"0 0 2px", fontWeight:600 }}>{trn.pacientes.nombre} {trn.pacientes.apellido}</p></> : <p style={{ fontSize:13, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif" }}>Sin paciente</p>}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}><Badge estado={trn.estado}/><IcoSVG name="chevron" size={14} color="#A89890"/></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminDisponibilidad() {
  const [modal, setModal] = useState(false);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    supabase.from("disponibilidad").select("*").order("fecha").order("hora").then(({ data }) => { if(data) setSlots(data); });
  }, []);

  const agregar = async () => {
    if(!fecha || !hora) return;
    const { data, error } = await supabase.from("disponibilidad").insert([{ fecha, hora, ocupado:false }]).select().single();
    if(error) { alert("Error al guardar: " + error.message); return; }
    if(data) { setSlots(prev => [...prev, data]); setModal(false); setFecha(""); setHora(""); }
  };

  const eliminar = async (id) => {
    await supabase.from("disponibilidad").delete().eq("id", id);
    setSlots(slots.filter(sl => sl.id !== id));
  };

  const porFecha = slots.reduce((acc, sl) => { (acc[sl.fecha] = acc[sl.fecha] || []).push(sl); return acc; }, {});

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative", display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}><h1 style={{...S.hTitle}}>Disponibilidad</h1><p style={{...S.hSub}}>Proximos 6 meses</p></div>
        <button onClick={()=>setModal(true)} style={{...S.btnP, width:"auto", padding:"10px 20px", fontSize:12, position:"relative", zIndex:1}}>+ Agregar</button>
      </div>
      <div style={{ padding:20 }}>
        {Object.entries(porFecha).map(([fecha, sls]) => (
          <div key={fecha} style={{...S.card}}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <p style={{ fontSize:15, color:"#2C2420", margin:0, fontWeight:600 }}>{formatFecha(fecha)}</p>
              <span style={{ fontSize:11, fontFamily:"'Raleway',sans-serif", fontWeight:700, color:"#6D8F68", background:"#EBF1EA", padding:"3px 10px", borderRadius:50 }}>{sls.length} horarios</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {sls.map(sl => (
                <div key={sl.id} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:50, background:"#F5EDE6", border:"1px solid #DDD0C8" }}>
                  <span style={{ fontSize:12, fontFamily:"'Raleway',sans-serif", color:"#2C2420", fontWeight:600 }}>{formatHora(sl.hora)}</span>
                  <button onClick={()=>eliminar(sl.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#A89890", padding:0, fontSize:14, lineHeight:1 }}>x</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(44,36,32,0.4)", display:"flex", alignItems:"flex-end", zIndex:200 }}>
          <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", padding:"28px 24px 44px", width:"100%", maxWidth:430, margin:"0 auto" }}>
            <h3 style={{ fontSize:20, color:"#2C2420", fontWeight:600, margin:"0 0 20px" }}>Agregar disponibilidad</h3>
            <label style={{...S.lbl}}>Fecha</label>
            <input type="date" style={{...S.inp, marginBottom:16}} value={fecha} onChange={e=>setFecha(e.target.value)}/>
            <label style={{...S.lbl}}>Hora</label>
            <input type="time" style={{...S.inp, marginBottom:24}} value={hora} onChange={e=>setHora(e.target.value)}/>
            <div style={{ display:"flex", gap:10 }}>
              <button style={{...S.btnS, flex:1}} onClick={()=>setModal(false)}>Cancelar</button>
              <button style={{...S.btnP, flex:1}} onClick={agregar}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminPacientes() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    supabase.from("pacientes").select("*").order("apellido").then(({ data }) => { if(data) setPacientes(data); });
  }, []);

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}><div style={{...S.hAccent}}/><div style={{ position:"relative", zIndex:1 }}><h1 style={{...S.hTitle}}>Pacientes</h1><p style={{...S.hSub}}>{pacientes.length} registradas</p></div></div>
      <div style={{ padding:20 }}>
        {pacientes.length === 0 ? (
          <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:40 }}>No hay pacientes registradas</p>
        ) : pacientes.map((pac, idx) => (
          <div key={idx} style={{...S.card, display:"flex", alignItems:"center", gap:14}}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:"#E8D5C8", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ fontSize:18, color:"#2C2420", fontWeight:600 }}>{pac.nombre ? pac.nombre[0] : "?"}</span>
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:15, color:"#2C2420", margin:"0 0 2px", fontWeight:600 }}>{pac.nombre} {pac.apellido}</p>
              <p style={{ fontSize:12, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif" }}>{pac.celular}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [rol, setRol] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [tabP, setTabP] = useState("disponibles");
  const [tabA, setTabA] = useState("turnos");

  const handleLogin = (rolSelec, dataPaciente) => {
    setRol(rolSelec);
    setPaciente(dataPaciente);
  };

  if(!rol) return <Login onLogin={handleLogin}/>;

  if(rol==="paciente") return (
    <div style={{...S.app}}>
      <Fonts/>
      {tabP==="disponibles" && <TurnosDisponibles paciente={paciente}/>}
      {tabP==="misturnos" && <MisTurnos/>}
      <nav style={{...S.nav}}>
        {[{id:"disponibles",name:"calendar",lbl:"Reservar"},{id:"misturnos",name:"user",lbl:"Mis turnos"}].map(navItem=>(
          <button key={navItem.id} style={{...navBtn(tabP===navItem.id)}} onClick={()=>setTabP(navItem.id)}>
            <IcoSVG name={navItem.name} size={22} color={tabP===navItem.id?"#8FAF8A":"#A89890"}/>
            {navItem.lbl}
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <div style={{...S.app}}>
      <Fonts/>
      {tabA==="turnos" && <AdminTurnos/>}
      {tabA==="disponibilidad" && <AdminDisponibilidad/>}
      {tabA==="pacientes" && <AdminPacientes/>}
      <nav style={{...S.nav}}>
        {[{id:"turnos",name:"home",lbl:"Turnos"},{id:"disponibilidad",name:"calendar",lbl:"Disponibilidad"},{id:"pacientes",name:"users",lbl:"Pacientes"}].map(navItem=>(
          <button key={navItem.id} style={{...navBtn(tabA===navItem.id)}} onClick={()=>setTabA(navItem.id)}>
            <IcoSVG name={navItem.name} size={22} color={tabA===navItem.id?"#8FAF8A":"#A89890"}/>
            {navItem.lbl}
          </button>
        ))}
      </nav>
    </div>
  );
}
