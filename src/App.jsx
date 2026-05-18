import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";




const GinkgoIcon = () => (
  <svg width="65" height="65" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(100,140)">
      <rect x="-2" y="0" width="4" height="35" rx="2" fill="white"/>
      <path d="M0,0 Q-15,-20 -35,-60 Q-20,-45 -8,-20 Q-4,-10 0,-2" fill="white" opacity="0.95"/>
      <path d="M0,0 Q-25,-15 -55,-45 Q-35,-35 -12,-15 Q-5,-8 0,-2" fill="white" opacity="0.85"/>
      <path d="M0,0 Q-30,-5 -65,-20 Q-45,-18 -15,-8 Q-7,-4 0,-2" fill="white" opacity="0.75"/>
      <path d="M0,0 Q15,-20 35,-60 Q20,-45 8,-20 Q4,-10 0,-2" fill="white" opacity="0.95"/>
      <path d="M0,0 Q25,-15 55,-45 Q35,-35 12,-15 Q5,-8 0,-2" fill="white" opacity="0.85"/>
      <path d="M0,0 Q30,-5 65,-20 Q45,-18 15,-8 Q7,-4 0,-2" fill="white" opacity="0.75"/>
      <path d="M0,0 Q0,-25 0,-65 Q5,-45 2,-20 Q1,-10 0,-2" fill="white" opacity="0.95"/>
    </g>
  </svg>
);

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

const ADMINS = ['1158242449', '1165286823'];

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
    if(ADMINS.includes(cel.replace(/\s/g, ""))) {
      setLoad(false);
      onLogin("admin", null);
      return;
    }
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
          <GinkgoIcon/>
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
