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
          <img src={LOGO} width={68} height={68} alt="logo" style={{ objectFit:"contain", filter:"brightness(0) invert(1)" }}/>
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
        <strong style={{ color:"#2C2420" }}>{DISPONIBLES[dIdx]?.fecha} - {horaSelec} hs</strong>
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
            <p style={{ fontSize:15, color:"#2C2420", margin:"0 0 16px", fontWeight:600 }}>{DISPONIBLES[dIdx]?.fecha} - {horaSelec} hs</p>
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
          <h2 style={{ fontSize:22, color:"#2C2420", fontWeight:600, margin:"12px 0 0" }}>{det.fecha}</h2>
          <div style={{ height:1, background:"#DDD0C8", margin:"16px 0" }}/>
          <div style={{ display:"flex", gap:24 }}>
            <div><p style={{...S.lbl}}>Fecha</p><p style={{ fontSize:15, color:"#2C2420", margin:0, fontFamily:"'Raleway',sans-serif", fontWeight:600 }}>{det.fecha}</p></div>
            <div><p style={{...S.lbl}}>Hora</p><p style={{ fontSize:15, color:"#2C2420", margin:0, fontFamily:"'Raleway',sans-serif", fontWeight:600 }}>{det.hora} hs</p></div>
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
              <div style={{ flex:1, paddingRight:12 }}><Badge estado={trn.estado}/><h3 style={{ fontSize:16, color:"#2C2420", fontWeight:600, margin:"10px 0 4px" }}>{trn.fecha}</h3></div>
              <div style={{ textAlign:"right" }}><p style={{ fontSize:16, color:"#2C2420", fontWeight:700, margin:"0 0 2px", fontFamily:"'Raleway',sans-serif" }}>{trn.hora} hs</p></div>
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
        <div style={{ zIndex:1 }}><h1 style={{...S.hTitle}}>{sel.fecha} - {sel.hora}</h1><p style={{...S.hSub}}>Detalle</p></div>
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
            <p style={{...S.lbl, marginBottom:8}}>{fecha}</p>
            {trns.map(trn => (
              <div key={trn.id} style={{...S.card, cursor:"pointer", display:"flex", alignItems:"center", gap:12, padding:"14px 16px", marginBottom:8}} onClick={()=>setSel(trn)}>
                <p style={{ fontSize:14, color:"#2C2420", fontWeight:700, margin:0, fontFamily:"'Raleway',sans-serif", minWidth:44 }}>{trn.hora}</p>
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
    if(!error) { setSlots([...slots, data]); setModal(false); setFecha(""); setHora(""); }
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
              <p style={{ fontSize:15, color:"#2C2420", margin:0, fontWeight:600 }}>{fecha}</p>
              <span style={{ fontSize:11, fontFamily:"'Raleway',sans-serif", fontWeight:700, color:"#6D8F68", background:"#EBF1EA", padding:"3px 10px", borderRadius:50 }}>{sls.length} slots</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {sls.map(sl => (
                <div key={sl.id} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:50, background:"#F5EDE6", border:"1px solid #DDD0C8" }}>
                  <span style={{ fontSize:12, fontFamily:"'Raleway',sans-serif", color:"#2C2420", fontWeight:600 }}>{sl.hora}</span>
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
