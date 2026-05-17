import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";

const LOGO = "data:image/png;base64,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";

const C = {
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

const nb = (a) => ({ display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", color:a?"#8FAF8A":"#A89890", fontSize:10, fontFamily:"'Raleway',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:a?700:500 });

const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Raleway:wght@300;400;500;600;700;800&display=swap');
    .marca-title {
      font-family: 'Trebuchet MS', 'Century Gothic', 'Gill Sans', Arial, sans-serif !important;
      font-weight: 700 !important;
      letter-spacing: 0.06em !important;
      font-size: 32px !important;
    }
  `}</style>
);

const Ico = ({ n, size=22, color="currentColor" }) => {
  const p = { fill:"none", stroke:color, strokeWidth:"1.8", strokeLinecap:"round", strokeLinejoin:"round" };
  const m = {
    cal:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    home: <svg width={size} height={size} viewBox="0 0 24 24" {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    usr:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    usrs: <svg width={size} height={size} viewBox="0 0 24 24" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    chk:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
    clk:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    edt:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    bck:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><polyline points="15 18 9 12 15 6"/></svg>,
    chv:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><polyline points="9 18 15 12 9 6"/></svg>,
    lf:   <svg width={size} height={size} viewBox="0 0 24 24" {...p}><path d="M17 8C8 10 5.9 16.17 3.82 19.43L5.71 21l1-1.07A4.67 4.67 0 008 21c9 0 15-9 11-18A13.5 13.5 0 013 3c0 9 4 15 13 18"/></svg>,
    inf:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    wa:   <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  };
  return m[n] || null;
};

const Badge = ({ estado }) => {
  const map = {
    confirmado:{ bg:"#EBF1EA", text:"#6D8F68", label:"Confirmado" },
    pendiente: { bg:"#FBF3E4", text:"#C8A46A", label:"Pendiente"  },
    cancelado: { bg:"#FAE8E8", text:"#B86060", label:"Cancelado"  },
    libre:     { bg:"#F5EDE6", text:"#6B5C56", label:"Disponible" },
  };
  const s = map[estado] || map.pendiente;
  return <span style={{ display:"inline-block", padding:"3px 12px", borderRadius:50, fontSize:11, fontFamily:"'Raleway',sans-serif", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", backgroundColor:s.bg, color:s.text }}>{s.label}</span>;
};

const PROTOS = [
  { id:1, nombre:"Limpieza facial profunda", dur:60, prep:["Llegar sin maquillaje ni base","No aplicar cremas ni protector solar el día del turno","Informar si tomás medicación fotosensibilizante"] },
  { id:2, nombre:"Peeling químico", dur:45, prep:["Suspender retinol y ácidos 5 días antes","No depilar la zona 48 hs antes","Llegar con piel limpia y sin maquillaje","Evitar sol intenso 3 días previos"] },
  { id:3, nombre:"Hidratación intensiva", dur:30, prep:["Llegar con piel limpia","No se requiere preparación especial"] },
  { id:4, nombre:"Láser fraccionado", dur:90, prep:["Evitar sol 2 semanas previas con FPS 50","Suspender retinoides y ácidos 7 días antes","No realizar otros tratamientos 15 días previos","Llegar sin maquillaje","Informar si tomás anticoagulantes"] },
  { id:5, nombre:"Consulta inicial", dur:30, prep:["Podés venir con o sin maquillaje","Traer lista de medicamentos si los tenés"] },
  { id:6, nombre:"Microdermoabrasión", dur:50, prep:["No exfoliar la zona 3 días antes","Llegar sin maquillaje","Evitar sol intenso 48 hs antes"] },
];

const DISPONIBLES = [
  { f:"Lun 19 may", slots:["09:00","10:00","15:00","16:00"] },
  { f:"Mar 20 may", slots:["09:00","11:00","14:00"] },
  { f:"Mié 21 may", slots:["10:00","11:00","16:00","17:00"] },
  { f:"Jue 22 may", slots:["09:00","15:00"] },
  { f:"Vie 23 may", slots:["10:00","14:00","15:00"] },
  { f:"Lun 26 may", slots:["09:00","10:00","14:00"] },
  { f:"Mar 27 may", slots:["11:00","15:00","16:00"] },
  { f:"Mié 28 may", slots:["09:00","10:00","17:00"] },
];

// TODOS los turnos para el admin (pasados, hoy, futuros)
const TODOS_TURNOS = [
  { id:1,  fecha:"Lun 12 may", hora:"09:00", pac:"Carla Ruiz",      proto:"Consulta inicial",         est:"confirmado", cel:"+54 9 11 3333-7777" },
  { id:2,  fecha:"Lun 12 may", hora:"10:00", pac:"Ana Rodríguez",   proto:"Hidratación intensiva",    est:"confirmado", cel:"+54 9 11 5555-1234" },
  { id:3,  fecha:"Mar 13 may", hora:"11:00", pac:"Sofía Martínez",  proto:"Peeling químico",          est:"cancelado",  cel:"+54 9 11 8765-4321" },
  { id:4,  fecha:"Mié 14 may", hora:"09:00", pac:"María López",     proto:"Limpieza facial profunda", est:"confirmado", cel:"+54 9 11 1234-5678" },
  { id:5,  fecha:"Mié 14 may", hora:"10:00", pac:"",                proto:"",                         est:"libre",      cel:"" },
  { id:6,  fecha:"Mié 14 may", hora:"15:00", pac:"Laura Fernández", proto:"Láser fraccionado",        est:"confirmado", cel:"+54 9 11 9999-0000" },
  { id:7,  fecha:"Jue 15 may", hora:"09:00", pac:"Carla Ruiz",      proto:"Microdermoabrasión",       est:"pendiente",  cel:"+54 9 11 3333-7777" },
  { id:8,  fecha:"Jue 15 may", hora:"11:00", pac:"",                proto:"",                         est:"libre",      cel:"" },
  { id:9,  fecha:"Vie 16 may", hora:"10:00", pac:"Ana Rodríguez",   proto:"Consulta inicial",         est:"confirmado", cel:"+54 9 11 5555-1234" },
  { id:10, fecha:"Lun 19 may", hora:"09:00", pac:"",                proto:"",                         est:"libre",      cel:"" },
  { id:11, fecha:"Lun 19 may", hora:"15:00", pac:"María López",     proto:"Peeling químico",          est:"pendiente",  cel:"+54 9 11 1234-5678" },
  { id:12, fecha:"Mar 20 may", hora:"10:00", pac:"",                proto:"",                         est:"libre",      cel:"" },
  { id:13, fecha:"Mié 21 may", hora:"14:00", pac:"Sofía Martínez",  proto:"Hidratación intensiva",    est:"confirmado", cel:"+54 9 11 8765-4321" },
];

function Login({ onLogin }) {
  const [paso, setPaso] = useState(1);
  const [cel, setCel] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [load, setLoad] = useState(false);

  const verificarCelular = async () => {
    if(cel.length<8) return;
    setLoad(true);
    const { data } = await supabase
      .from("pacientes")
      .select("*")
      .eq("celular", cel)
      .single();
    setLoad(false);
    if(data) {
      onLogin("paciente", data);
    } else {
      setPaso(2);
    }
  };

  const completarPerfil = async () => {
    if(nombre.length<2||apellido.length<2) return;
    setLoad(true);
    const { data, error } = await supabase
      .from("pacientes")
      .insert([{ nombre, apellido, celular: cel }])
      .select()
      .single();
    setLoad(false);
    if(!error) onLogin("paciente", data);
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(180deg,#C8DBC5 0%,#F5EDE6 100%)", display:"flex", flexDirection:"column", justifyContent:"center", padding:"32px 28px" }}>
      <Fonts/>
      <div style={{ textAlign:"center", marginBottom:44 }}>
        <div style={{ width:100, height:100, borderRadius:"50%", background:"#6D8F68", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", boxShadow:"0 4px 24px rgba(44,36,32,0.15)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="68" height="68"> <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill="white" stroke="none"> <path d="M2967 5950 c-27 -10 -75 -44 -113 -79 -35 -34 -72 -61 -82 -62 -9 -1 -45 -2 -79 -3 -65 -2 -93 -16 -196 -98 -27 -21 -55 -38 -62 -38 -7 0 -35 20 -63 45 -80 72 -125 78 -168 22 -14 -17 -34 -26 -68 -30 -27 -4 -68 -18 -91 -31 -50 -30 -133 -117 -146 -154 -6 -18 -28 -37 -67 -58 -63 -34 -99 -77 -107 -133 -4 -20 -8 -47 -11 -61 -8 -38 -103 -122 -187 -164 -71 -36 -80 -38 -135 -32 -47 5 -71 2 -114 -14 -71 -26 -166 -104 -195 -159 -33 -63 -42 -71 -77 -71 -44 0 -77 -20 -99 -58 -34 -58 -39 -100 -20 -175 l17 -67 -30 -33 c-69 -74 -152 -203 -174 -269 -10 -32 -9 -43 4 -69 9 -18 16 -37 16 -43 0 -6 -22 -38 -48 -71 -91 -112 -99 -145 -52 -215 16 -25 30 -55 30 -67 0 -12 -18 -56 -41 -99 -54 -101 -50 -118 40 -204 70 -65 72 -69 96 -174 10 -45 59 -84 136 -107 l69 -21 302 51 c440 73 563 83 763 61 214 -24 454 -119 681 -267 212 -140 483 -413 560 -565 42 -83 81 -401 69 -563 -9 -121 -24 -312 -40 -490 -8 -88 -20 -220 -25 -293 -21 -261 -51 -388 -156 -644 -25 -60 -44 -119 -42 -130 4 -28 49 -61 71 -52 63 24 114 264 167 784 6 58 20 167 31 244 38 266 69 563 79 766 15 299 23 352 65 435 122 241 414 493 820 706 286 150 494 197 970 219 302 14 363 26 493 91 56 29 108 59 114 66 6 8 17 56 23 107 9 71 21 114 50 175 47 100 48 127 5 181 -29 37 -32 46 -26 86 4 32 0 58 -15 97 -20 49 -20 58 -9 148 15 114 10 142 -34 184 -18 17 -45 49 -58 71 -37 58 -57 72 -128 90 -36 9 -76 23 -88 31 -35 22 -52 73 -52 158 0 141 -47 204 -177 235 -44 10 -59 20 -97 64 -31 37 -57 56 -85 64 -29 9 -55 29 -92 73 -59 67 -83 78 -129 54 l-31 -16 -40 45 c-58 65 -127 90 -239 83 -53 -2 -98 -11 -119 -21 -18 -10 -34 -16 -35 -14 -1 2 -12 19 -24 39 -29 47 -66 62 -134 55 -57 -7 -69 -3 -86 31 -13 24 -102 88 -102 73 0 -5 16 -20 36 -34 20 -13 47 -40 60 -60 24 -35 27 -36 85 -36 56 0 64 -3 95 -34 19 -19 34 -41 34 -49 0 -26 35 -29 75 -6 24 14 59 23 103 26 88 6 167 -22 235 -85 47 -44 49 -45 86 -36 50 13 64 7 100 -43 20 -28 51 -53 90 -72 36 -19 74 -48 96 -76 32 -38 48 -48 106 -65 117 -35 147 -78 164 -235 4 -33 13 -75 21 -94 8 -18 11 -38 7 -44 -3 -6 -1 -7 5 -3 6 4 22 0 34 -7 13 -8 41 -18 63 -22 62 -11 95 -33 115 -77 10 -22 39 -60 65 -83 l47 -44 -7 -82 c-3 -46 -9 -87 -11 -91 -8 -12 17 -128 27 -128 5 0 9 -28 9 -63 0 -62 15 -101 47 -120 7 -4 13 -17 13 -29 0 -22 -58 -138 -70 -138 -4 0 -7 -6 -8 -12 -1 -7 -7 -48 -13 -90 -11 -65 -16 -78 -33 -81 -19 -4 -19 -4 2 -6 25 -1 30 -28 10 -53 -7 -8 -56 -34 -109 -57 -120 -51 -212 -66 -519 -81 -338 -16 -463 -34 -633 -92 -199 -66 -412 -175 -642 -326 -103 -68 -161 -117 -278 -232 -81 -80 -147 -142 -147 -137 0 4 11 25 25 48 14 22 23 44 20 48 -6 10 74 135 129 201 77 93 275 286 387 376 259 208 689 506 929 643 69 40 211 115 317 169 106 53 190 98 188 100 -1 2 -111 -50 -242 -116 -389 -194 -833 -455 -1038 -610 -56 -43 -195 -171 -315 -291 -118 -118 -210 -208 -204 -200 139 180 201 256 290 348 126 131 188 184 469 398 116 87 274 209 352 270 123 97 242 180 373 261 59 37 26 24 -49 -18 -277 -157 -756 -515 -1040 -779 -247 -228 -487 -546 -622 -825 l-59 -121 4 75 c3 44 15 105 30 149 31 90 96 222 107 216 9 -6 30 51 22 59 -4 3 -1 6 6 6 7 0 9 5 6 10 -4 6 36 92 88 193 198 382 271 480 687 927 154 166 187 202 319 355 136 157 301 326 396 408 86 73 99 86 60 60 -56 -39 -209 -177 -325 -294 -181 -182 -566 -608 -714 -789 -32 -40 -26 -24 14 35 15 22 87 139 160 260 159 265 265 425 373 563 84 108 115 170 46 93 -63 -70 -219 -275 -285 -374 -34 -51 -120 -189 -191 -307 -72 -119 -189 -304 -261 -412 -165 -245 -364 -612 -438 -803 -13 -34 -20 -43 -22 -30 -8 59 210 614 372 948 100 206 336 629 479 858 91 147 232 345 311 438 84 99 109 131 103 131 -12 0 -170 -190 -272 -325 -277 -369 -533 -822 -750 -1330 -43 -99 -99 -229 -125 -290 -59 -138 -94 -241 -141 -425 -28 -106 -38 -134 -38 -105 -2 82 20 273 40 350 11 44 29 122 40 174 10 51 55 252 98 445 43 193 97 443 120 556 65 316 145 635 190 753 6 16 11 34 10 40 -1 20 -28 -60 -74 -218 -58 -202 -80 -294 -145 -610 -44 -216 -47 -227 -140 -615 -65 -270 -120 -527 -135 -633 -17 -113 -12 -23 10 218 43 457 65 635 116 950 66 400 106 577 200 886 32 108 82 283 109 389 27 106 52 195 54 198 3 2 21 -1 41 -8 20 -7 46 -9 59 -6 15 4 34 -3 56 -19 49 -37 61 -30 15 8 -29 24 -53 34 -93 38 -45 6 -60 13 -96 48 -40 40 -44 41 -108 41 l-67 0 -38 46 -37 47 -67 -6 c-63 -5 -120 -25 -133 -46 -13 -21 -36 -160 -60 -361 -78 -645 -97 -765 -121 -765 -5 0 -16 34 -22 75 -12 70 -24 165 -104 819 -17 139 -35 264 -39 277 -8 21 -16 24 -57 24 -27 -1 -70 -9 -96 -20z m121 -22 c9 -12 19 -96 78 -658 46 -441 82 -650 114 -650 36 0 97 316 181 930 23 173 47 321 53 328 12 17 72 42 101 42 13 0 39 -18 66 -47 l44 -48 82 3 c79 3 83 2 99 -24 15 -21 16 -32 7 -62 -25 -87 -105 -361 -156 -532 -114 -383 -146 -531 -232 -1075 -22 -139 -62 -480 -81 -687 -10 -104 -21 -188 -25 -188 -16 0 -21 365 -10 645 17 398 39 790 51 910 28 263 113 602 225 900 28 76 31 93 9 52 -25 -46 -81 -207 -118 -339 -109 -390 -137 -563 -156 -958 -5 -118 -15 -312 -21 -430 -7 -133 -9 -347 -5 -560 3 -190 2 -358 -2 -375 -6 -19 -11 72 -15 255 -4 157 -10 409 -14 561 -6 287 0 398 38 674 28 204 22 204 -18 0 -33 -169 -36 -195 -40 -430 -3 -137 0 -430 7 -650 6 -220 14 -498 17 -618 6 -244 22 -275 24 -47 1 80 5 172 9 205 4 33 5 -34 2 -150 -2 -115 -8 -220 -13 -233 -5 -13 -9 -128 -10 -255 -1 -272 -11 -435 -21 -372 -9 53 -16 134 -28 337 -10 167 -54 468 -70 478 -5 3 -33 80 -63 170 -122 371 -259 674 -483 1066 -229 402 -342 633 -479 979 -65 165 -140 351 -166 413 l-47 112 31 24 c45 33 86 52 130 60 21 4 35 11 32 16 -8 13 36 40 67 40 17 0 35 -9 46 -22 9 -13 34 -39 54 -58 21 -20 47 -56 58 -81 18 -37 21 -39 16 -14 -2 17 -8 38 -11 47 -5 11 1 20 17 28 13 7 44 29 69 50 25 21 61 47 80 59 38 23 99 28 100 9 0 -10 2 -10 6 0 2 6 15 12 28 12 40 0 67 15 134 75 92 82 181 117 209 83z m-979 -575 c221 -559 257 -647 340 -813 48 -96 153 -290 233 -430 166 -291 231 -417 316 -615 172 -403 268 -705 288 -910 4 -38 4 -68 1 -65 -8 8 -94 223 -144 360 -44 124 -140 334 -319 695 -125 253 -237 459 -347 635 -251 404 -250 402 -487 880 -62 124 -116 230 -122 235 -5 6 2 -12 15 -40 13 -27 52 -108 86 -180 175 -363 237 -483 326 -630 174 -286 450 -773 443 -780 -2 -3 -27 27 -56 65 -29 38 -119 150 -200 247 -269 322 -391 502 -562 828 -88 168 -166 301 -182 311 -6 4 -9 3 -6 -2 106 -182 159 -276 214 -385 160 -316 249 -441 782 -1098 93 -115 111 -159 25 -63 -31 35 -136 135 -233 222 -261 234 -410 403 -508 579 -218 388 -281 487 -386 602 -55 62 -50 51 21 -41 76 -98 152 -219 243 -385 45 -83 93 -170 106 -195 l25 -45 -37 40 c-20 22 -33 33 -29 25 5 -8 -29 20 -76 63 -159 148 -230 195 -551 361 -104 54 -188 101 -188 106 0 14 88 80 133 100 31 14 63 19 117 17 90 -2 131 15 236 93 76 58 112 105 138 186 19 59 53 94 118 122 45 20 55 30 100 111 9 17 21 31 25 31 5 0 51 -107 102 -237z m-791 -539 c236 -129 283 -157 377 -228 135 -102 384 -353 570 -575 l30 -36 -31 22 c-18 13 -112 98 -211 191 -193 181 -314 277 -461 366 -111 68 -289 157 -424 211 -54 22 -98 43 -98 46 0 14 52 99 61 99 6 0 90 -43 187 -96z m-142 -63 c185 -78 434 -230 619 -378 55 -44 172 -144 260 -223 88 -78 200 -170 248 -202 169 -113 486 -412 576 -542 29 -42 51 -79 49 -81 -2 -3 -49 48 -104 112 -128 151 -234 242 -474 410 -107 75 -262 189 -345 252 -82 64 -204 152 -271 197 -216 144 -644 374 -771 414 -38 12 -41 15 -31 34 26 50 40 59 94 53 29 -3 96 -24 150 -46z m-151 -84 c44 -19 125 -60 180 -92 55 -32 170 -99 255 -148 194 -111 323 -196 470 -309 210 -162 374 -283 473 -352 132 -91 206 -153 305 -255 205 -210 319 -405 454 -776 33 -91 32 -90 -45 23 -97 142 -207 272 -367 432 -172 172 -316 286 -478 378 -297 169 -808 353 -1042 377 -154 15 -333 50 -462 92 -42 13 -47 17 -38 33 6 10 10 28 10 39 0 11 7 24 17 29 14 9 14 10 -5 16 -35 12 -29 69 15 144 31 52 40 61 57 56 18 -6 19 -5 7 10 -11 14 -11 16 2 16 10 0 14 6 11 13 -6 17 72 107 93 107 21 0 78 -35 338 -206 127 -83 280 -180 340 -216 119 -70 477 -258 491 -258 10 0 -44 31 -250 142 -201 108 -358 203 -626 378 -124 81 -241 155 -260 166 -39 23 -58 68 -59 147 -1 58 4 59 114 14z m-211 -656 c130 -37 225 -57 361 -76 165 -23 257 -43 390 -87 408 -136 724 -295 955 -481 117 -94 358 -336 466 -467 93 -113 216 -290 201 -290 -3 0 -40 44 -82 98 -99 124 -349 371 -490 485 -229 184 -450 309 -683 386 -68 22 -250 70 -405 106 -155 37 -306 73 -335 82 -30 8 -55 13 -58 10 -6 -5 220 -73 441 -132 259 -70 400 -114 514 -162 272 -113 501 -272 761 -528 134 -132 199 -202 110 -119 -348 323 -744 546 -1130 636 -69 16 -215 52 -325 80 -110 28 -249 62 -309 75 -116 25 -377 65 -383 59 -3 -2 29 -9 69 -16 196 -30 301 -55 469 -109 101 -33 238 -71 304 -86 246 -55 287 -67 496 -151 185 -74 339 -146 339 -159 0 -2 -37 13 -82 34 -95 44 -177 73 -263 95 -115 29 -764 155 -925 180 -85 13 -476 46 -549 46 -66 0 -78 64 -25 143 35 53 35 106 0 176 -34 67 -30 101 20 159 20 23 38 42 41 42 3 0 51 -13 107 -29z m181 -532 c99 -11 239 -34 310 -50 172 -41 343 -78 435 -94 69 -12 45 -13 -291 -14 -472 -1 -666 16 -691 62 -6 12 -34 46 -62 75 l-51 54 85 -7 c47 -4 166 -15 265 -26z m-85 -158 c25 -6 137 -16 250 -22 113 -6 212 -13 220 -16 8 -3 -59 -20 -150 -39 -234 -47 -342 -44 -409 11 -27 23 -55 78 -45 88 5 4 57 -4 134 -22z m2507 -188 c-3 -10 -5 -2 -5 17 0 19 2 27 5 18 2 -10 2 -26 0 -35z"/> <path d="M2992 5818 c-26 -188 -35 -336 -36 -573 -1 -260 2 -290 55 -621 16 -99 38 -259 49 -355 44 -367 69 -603 66 -606 -6 -6 -61 239 -115 507 -27 135 -77 378 -111 540 -75 359 -112 563 -136 737 -10 73 -20 131 -22 128 -8 -7 18 -220 49 -405 33 -195 79 -432 145 -744 24 -115 44 -214 43 -220 -1 -17 -100 289 -194 599 -84 280 -123 428 -166 624 -13 57 -25 99 -27 93 -2 -6 6 -55 18 -109 56 -262 134 -537 296 -1043 42 -129 84 -262 94 -295 19 -61 66 -255 114 -470 37 -165 37 -165 32 -165 -2 0 -30 80 -61 178 -153 475 -349 951 -620 1507 -116 237 -200 424 -224 498 -7 21 -15 37 -17 34 -10 -9 54 -167 191 -467 458 -1010 649 -1489 770 -1935 19 -72 33 -111 30 -87 -3 23 -3 42 -1 42 16 0 51 -189 91 -494 9 -65 20 -128 25 -140 15 -36 11 140 -5 249 -8 54 -20 183 -25 285 -5 102 -14 264 -20 360 -6 96 -15 294 -20 440 -7 176 -18 324 -35 440 l-24 175 5 -110 c2 -60 11 -229 19 -375 16 -282 45 -912 44 -939 0 -9 -18 56 -39 143 -43 173 -73 358 -90 556 -25 283 -74 664 -121 950 -48 289 -56 636 -23 984 16 173 14 216 -4 84z"/> <path d="M3552 5780 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z"/> <path d="M2722 5715 c0 -16 2 -22 5 -12 2 9 2 23 0 30 -3 6 -5 -1 -5 -18z"/> <path d="M3543 5700 c0 -25 2 -35 4 -22 2 12 2 32 0 45 -2 12 -4 2 -4 -23z"/> <path d="M2732 5640 c0 -19 2 -27 5 -17 2 9 2 25 0 35 -3 9 -5 1 -5 -18z"/> <path d="M3530 5621 c0 -16 -14 -110 -31 -208 -31 -182 -47 -306 -30 -233 38 158 82 470 67 470 -3 0 -6 -13 -6 -29z"/> <path d="M3452 5115 c0 -16 2 -22 5 -12 2 9 2 23 0 30 -3 6 -5 -1 -5 -18z"/> <path d="M3442 5050 c0 -19 2 -27 5 -17 2 9 2 25 0 35 -3 9 -5 1 -5 -18z"/> <path d="M3425 4917 c-4 -53 -5 -101 -3 -109 3 -7 9 33 13 90 4 57 5 105 2 108 -3 3 -8 -37 -12 -89z"/> <path d="M3221 3084 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z"/> <path d="M3232 3040 c0 -14 4 -38 8 -55 7 -27 8 -27 8 -5 0 14 -4 39 -8 55 -7 27 -8 27 -8 5z"/> <path d="M3252 2930 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z"/> <path d="M1335 4973 c6 -5 57 -43 115 -83 105 -75 185 -149 384 -358 128 -136 125 -119 -6 28 -130 147 -235 248 -326 312 -74 53 -188 122 -167 101z"/> <path d="M894 4356 c11 -9 24 -16 30 -16 12 0 7 5 -24 19 -24 11 -24 11 -6 -3z"/> <path d="M894 4326 c11 -9 24 -16 30 -16 12 0 7 5 -24 19 -24 11 -24 11 -6 -3z"/> <path d="M980 4286 c0 -2 7 -7 16 -10 8 -3 12 -2 9 4 -6 10 -25 14 -25 6z"/> <path d="M1040 4257 c0 -7 132 -79 136 -74 2 2 -28 20 -66 41 -39 20 -70 35 -70 33z"/> <path d="M1190 4176 c0 -3 9 -10 20 -16 11 -6 20 -8 20 -6 0 3 -9 10 -20 16 -11 6 -20 8 -20 6z"/> <path d="M1260 4136 c0 -6 201 -102 325 -156 61 -26 205 -82 320 -124 376 -138 444 -168 572 -252 165 -109 382 -350 515 -575 28 -49 54 -87 55 -85 5 5 -99 184 -150 261 -140 208 -307 378 -466 474 -68 41 -281 132 -293 125 -5 -3 -34 4 -66 15 -363 126 -527 190 -699 271 -108 51 -113 53 -113 46z"/> <path d="M830 4122 c8 -5 26 -13 40 -16 17 -5 20 -4 10 2 -8 5 -26 13 -40 16 -17 5 -20 4 -10 -2z"/> <path d="M901 4096 c10 -9 149 -76 149 -71 0 5 -136 75 -146 75 -4 0 -5 -2 -3 -4z"/> <path d="M1065 3795 c17 -8 37 -14 45 -14 8 0 -1 7 -20 14 -46 18 -64 17 -25 0z"/> <path d="M4010 5430 c-17 -50 -30 -93 -28 -96 3 -2 19 37 36 88 18 50 31 93 29 95 -2 2 -19 -37 -37 -87z"/> <path d="M4629 5423 c-196 -210 -489 -654 -668 -1011 -100 -199 -250 -553 -315 -744 -25 -71 -10 -54 24 29 210 510 302 707 443 956 185 324 292 480 536 778 33 41 22 36 -20 -8z"/> <path d="M4106 5278 c-74 -234 -145 -460 -166 -533 -25 -83 -50 -165 -105 -340 -51 -161 -142 -461 -180 -590 -24 -80 -28 -119 -5 -48 62 193 232 644 336 893 76 181 178 347 337 548 49 63 87 115 85 117 -4 4 -118 -129 -180 -211 -123 -162 -215 -335 -329 -622 -40 -100 -74 -181 -76 -179 -8 9 102 311 148 405 60 123 209 398 286 527 29 50 42 77 28 60 -33 -40 -186 -298 -270 -455 -64 -121 -77 -131 -29 -21 13 29 24 64 24 76 0 13 34 133 76 267 94 301 87 278 81 278 -3 0 -30 -78 -61 -172z"/> <path d="M4339 5383 c-13 -16 -12 -17 4 -4 9 7 17 15 17 17 0 8 -8 3 -21 -13z"/> <path d="M3956 5274 c-9 -26 -16 -52 -15 -58 0 -6 9 13 20 43 10 30 17 56 15 58 -2 2 -11 -17 -20 -43z"/> <path d="M4749 4963 c-13 -16 -12 -17 4 -4 9 7 17 15 17 17 0 8 -8 3 -21 -13z"/> <path d="M5378 4931 c-124 -72 -243 -160 -509 -373 -297 -238 -352 -285 -488 -407 -153 -139 -438 -472 -554 -648 -63 -96 -184 -313 -174 -313 3 0 27 39 53 88 195 358 515 715 1019 1138 367 308 503 412 671 513 37 23 63 41 58 41 -5 0 -39 -17 -76 -39z"/> <path d="M5500 4710 c-8 -5 -10 -10 -5 -10 6 0 17 5 25 10 8 5 11 10 5 10 -5 0 -17 -5 -25 -10z"/> <path d="M5345 4634 c-66 -36 -127 -73 -135 -81 -8 -9 5 -4 30 10 25 15 91 51 145 82 55 30 95 55 90 55 -6 0 -64 -30 -130 -66z"/> <path d="M5074 4472 c-343 -213 -708 -512 -1035 -848 -194 -200 -314 -354 -418 -534 -32 -55 -61 -97 -65 -93 -3 3 -6 1 -6 -6 0 -7 -20 -60 -45 -117 -59 -135 -57 -146 4 -19 60 127 177 315 277 447 96 127 358 388 651 651 325 292 440 381 739 574 11 6 16 12 13 12 -3 1 -55 -30 -115 -67z"/> <path d="M5820 4400 c-8 -5 -10 -10 -5 -10 6 0 17 5 25 10 8 5 11 10 5 10 -5 0 -17 -5 -25 -10z"/> <path d="M5258 4364 c-38 -20 -36 -28 2 -9 17 9 30 18 30 20 0 7 -1 6 -32 -11z"/> <path d="M5640 4320 c-9 -6 -10 -10 -3 -10 6 0 15 5 18 10 8 12 4 12 -15 0z"/> <path d="M5550 4280 c-19 -11 -31 -19 -27 -20 11 0 67 29 67 35 0 7 -1 7 -40 -15z"/> <path d="M5625 4116 c-362 -127 -677 -273 -955 -444 -365 -225 -638 -414 -750 -521 -41 -38 -28 -30 50 31 58 46 179 130 270 188 91 57 244 154 340 215 414 263 670 389 1068 526 97 33 178 62 181 64 13 14 -41 -2 -204 -59z"/> <path d="M5858 4003 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z"/> <path d="M5808 3993 c6 -2 18 -2 25 0 6 3 1 5 -13 5 -14 0 -19 -2 -12 -5z"/> <path d="M5640 3960 c-20 -6 -21 -8 -5 -8 11 0 29 3 40 8 25 11 -1 11 -35 0z"/> <path d="M5447 3910 c-214 -63 -390 -131 -551 -212 -127 -64 -541 -304 -661 -382 -287 -190 -409 -267 -392 -249 9 11 17 24 17 29 0 22 -271 -269 -294 -316 -4 -8 2 -4 14 10 98 113 128 144 187 193 113 92 622 417 763 487 36 18 143 75 237 127 234 129 424 214 633 284 185 61 210 77 47 29z"/> <path d="M5688 3803 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z"/> <path d="M5245 3715 c-39 -14 -40 -14 -5 -8 41 7 82 22 60 22 -8 0 -33 -7 -55 -14z"/> <path d="M5050 3660 c-63 -20 -146 -49 -183 -63 -85 -33 -438 -199 -433 -204 2 -2 88 33 192 77 309 132 324 138 454 185 152 54 130 58 -30 5z"/> <path d="M5705 3640 c-42 -11 -1 -11 50 -1 34 7 35 9 10 9 -16 0 -43 -4 -60 -8z"/> <path d="M5633 3623 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z"/> <path d="M5548 3613 c6 -2 18 -2 25 0 6 3 1 5 -13 5 -14 0 -19 -2 -12 -5z"/> <path d="M5410 3595 c-36 -7 -54 -13 -40 -13 14 0 57 5 95 12 39 8 57 14 40 14 -16 0 -59 -6 -95 -13z"/> <path d="M5303 3573 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z"/> <path d="M5175 3555 c-33 -7 -51 -13 -40 -13 11 -1 49 5 85 12 36 8 54 14 40 14 -14 0 -52 -6 -85 -13z"/> <path d="M4940 3510 c-69 -16 -159 -40 -200 -54 -84 -29 -74 -27 90 14 63 16 153 38 200 49 47 10 74 19 60 19 -14 0 -81 -13 -150 -28z"/> <path d="M3635 3169 c-4 -6 -5 -12 -2 -15 2 -3 7 2 10 11 7 17 1 20 -8 4z"/> </g> </svg>
        </div>
        <h1 className="marca-title" style={{ fontSize:30, color:"#2C2420", margin:0 }}>Mara Serena</h1>
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
            {load?"Verificando...":"Ingresar"}
          </button>
        </>}

        {paso===2 && <>
          <h2 style={{ fontSize:21, color:"#2C2420", fontWeight:600, margin:"0 0 6px" }}>¡Bienvenida!</h2>
          <p style={{ fontSize:13, color:"#A89890", margin:"0 0 24px", fontFamily:"'Raleway',sans-serif", lineHeight:1.6 }}>Completá tus datos para terminar de registrarte.</p>
          <label style={{...S.lbl}}>Nombre</label>
          <input style={{...S.inp, marginBottom:16}} placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)}/>
          <label style={{...S.lbl}}>Apellido</label>
          <input style={{...S.inp, marginBottom:20}} placeholder="Apellido" value={apellido} onChange={e=>setApellido(e.target.value)}/>
          <button style={{...S.btnP}} onClick={completarPerfil} disabled={load||nombre.length<2||apellido.length<2}>
            {load?"Guardando...":"Comenzar"}
          </button>
        </>}
      </div>
      <button onClick={()=>onLogin("admin")} style={{ background:"none", border:"none", cursor:"pointer", color:"#A89890", fontSize:11, fontFamily:"'Raleway',sans-serif", marginTop:28, textDecoration:"underline" }}>Acceso administración</button>
    </div>
  );
}

function TurnosDisponibles() {
  const [dIdx, setDIdx] = useState(null);
  const [hora, setHora] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [ok, setOk] = useState(false);

  const DISPONIBLES = [
    { f:"Lun 19 may", slots:["09:00","10:00","15:00","16:00"] },
    { f:"Mar 20 may", slots:["09:00","11:00","14:00"] },
    { f:"Mié 21 may", slots:["10:00","11:00","16:00","17:00"] },
    { f:"Jue 22 may", slots:["09:00","15:00"] },
    { f:"Vie 23 may", slots:["10:00","14:00","15:00"] },
    { f:"Lun 26 may", slots:["09:00","10:00","14:00"] },
    { f:"Mar 27 may", slots:["11:00","15:00","16:00"] },
    { f:"Mié 28 may", slots:["09:00","10:00","17:00"] },
  ];

  if(ok) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center", background:"linear-gradient(160deg,#EBF1EA 0%,#FAF5F1 100%)" }}>
      <Fonts/>
      <div style={{ width:88, height:88, borderRadius:"50%", background:"#EBF1EA", border:"2px solid #8FAF8A", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
        <Ico n="chk" size={40} color="#8FAF8A"/>
      </div>
      <h2 style={{ fontSize:28, color:"#2C2420", fontWeight:600, margin:"0 0 8px" }}>¡Turno reservado!</h2>
      <p style={{ fontSize:15, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", lineHeight:1.7, margin:"0 0 16px" }}>
        <strong style={{ color:"#2C2420" }}>{DISPONIBLES[dIdx]?.f} · {hora} hs</strong>
      </p>
      <div style={{...S.card, maxWidth:320, margin:"0 0 24px", textAlign:"left"}}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}><Ico n="wa" size={14} color="#8FAF8A"/><span style={{ fontSize:11, color:"#8FAF8A", fontFamily:"'Raleway',sans-serif", fontWeight:700, textTransform:"uppercase" }}>WhatsApp enviado</span></div>
        <p style={{ fontSize:12, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", margin:"0 0 12px", lineHeight:1.5, fontWeight:600 }}>Recordá estas indicaciones generales:</p>
        {[
          "Llegar sin maquillaje ni base",
          "No aplicar cremas ni protector solar el día del turno",
          "Avisanos si estás tomando alguna medicación",
          "Si no podés asistir, comunicate con nosotros"
        ].map((item,i)=>(
          <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"#8FAF8A", marginTop:5, flexShrink:0 }}/>
            <p style={{ fontSize:12, color:"#6B5C56", margin:0, fontFamily:"'Raleway',sans-serif", lineHeight:1.5 }}>{item}</p>
          </div>
        ))}
        <p style={{ fontSize:11, color:"#A89890", fontFamily:"'Raleway',sans-serif", margin:"12px 0 0", lineHeight:1.5 }}>48 hs antes te enviamos un recordatorio para confirmar tu asistencia.</p>
      </div>
      <button style={{...S.btnP}} onClick={()=>{setOk(false);setDIdx(null);setHora(null);setMensaje("");}}>Reservar otro turno</button>
    </div>
  );

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <h1 style={{...S.hTitle}}>Turnos disponibles</h1>
          <p style={{...S.hSub}}>Próximos 6 meses</p>
        </div>
      </div>
      <div style={{ padding:"20px" }}>
        <p style={{ fontSize:14, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", margin:"0 0 16px" }}>Elegí el día y horario que te quede mejor:</p>

        {DISPONIBLES.map((dia,i)=>(
          <div key={i} style={{ marginBottom:16 }}>
            <p style={{...S.lbl, marginBottom:8}}>{dia.f}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {dia.slots.map(h=>{ const sel=dIdx===i&&hora===h; return (
                <button key={h} onClick={()=>{setDIdx(i);setHora(h);}} style={{ padding:"10px 20px", borderRadius:50, border:`1.5px solid ${sel?"#8FAF8A":"#DDD0C8"}`, background:sel?"#8FAF8A":"#fff", color:sel?"#fff":"#2C2420", fontSize:13, fontFamily:"'Raleway',sans-serif", cursor:"pointer", fontWeight:600 }}>{h}</button>
              ); })}
            </div>
          </div>
        ))}

        {hora && (
          <div style={{...S.card, background:"#EBF1EA", border:"1px solid #B8CEB5", marginTop:8}}>
            <p style={{...S.lbl, color:"#6D8F68", marginBottom:4}}>Turno seleccionado</p>
            <p style={{ fontSize:15, color:"#2C2420", margin:"0 0 16px", fontWeight:600 }}>{DISPONIBLES[dIdx]?.f} · {hora} hs</p>
            <label style={{...S.lbl}}>¿Querés agregar un mensaje? <span style={{ color:"#B8CEB5" }}>(opcional)</span></label>
            <textarea
              style={{...S.inp, resize:"none", height:80, fontSize:14, lineHeight:1.5}}
              placeholder="Ej: quería consultar si pueden combinar dos tratamientos..."
              value={mensaje}
              onChange={e=>setMensaje(e.target.value)}
            />
            <button style={{...S.btnP, marginTop:16}} onClick={()=>setOk(true)}>Confirmar reserva</button>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminTurnos() {
  const [sel, setSel] = useState(null);
  const [turnosDB, setTurnosDB] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from("turnos")
        .select("*, pacientes(nombre, apellido, celular)")
        .order("fecha", { ascending: true })
        .order("hora", { ascending: true });
      if(data) setTurnosDB(data);
      setCargando(false);
    };
    cargar();
  }, []);

  const todosLosTurnos = turnosDB.length > 0 ? turnosDB.map(t => ({
    id: t.id,
    fecha: t.fecha,
    hora: t.hora,
    pac: t.pacientes ? t.pacientes.nombre + " " + t.pacientes.apellido : "",
    proto: t.proto || "",
    est: t.estado,
    cel: t.pacientes?.celular || "",
    mensaje: t.mensaje || ""
  })) : [];
  const [filtro, setFiltro] = useState("todos");

  const turnos = filtro==="todos" ? TODOS_TURNOS
    : filtro==="libres"     ? TODOS_TURNOS.filter(t=>t.est==="libre")
    : filtro==="pendientes" ? TODOS_TURNOS.filter(t=>t.est==="pendiente")
    : TODOS_TURNOS.filter(t=>t.est==="confirmado");

  const porFecha = turnos.reduce((acc,t)=>{ (acc[t.fecha]=acc[t.fecha]||[]).push(t); return acc; },{});
  const TODOS_TURNOS = todosLosTurnos;
  const stats = { tot:TODOS_TURNOS.filter(t=>t.est!=="libre").length, conf:TODOS_TURNOS.filter(t=>t.est==="confirmado").length, pend:TODOS_TURNOS.filter(t=>t.est==="pendiente").length, libres:TODOS_TURNOS.filter(t=>t.est==="libre").length };

  if(sel) {
    const pr = PROTOS.find(p=>p.nombre===sel.proto);
    return (
      <div style={{ paddingBottom:100 }}>
        <div style={{...S.header, display:"flex", alignItems:"center", gap:14}}>
          <div style={{...S.hAccent}}/>
          <button onClick={()=>setSel(null)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, zIndex:1 }}><Ico n="bck" size={20} color="#2C2420"/></button>
          <div style={{ zIndex:1 }}><h1 style={{...S.hTitle}}>{sel.fecha} · {sel.hora}</h1><p style={{...S.hSub}}>Detalle del turno</p></div>
        </div>
        <div style={{ padding:20 }}>
          {sel.est==="libre" ? (
            <div style={{...S.card, textAlign:"center", padding:"32px 20px"}}>
              <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", fontSize:15, margin:"0 0 20px" }}>Horario disponible</p>
              <button style={{...S.btnP}}>+ Asignar paciente</button>
            </div>
          ):<>
            <div style={{...S.card}}>
              <Badge estado={sel.est}/>
              <h2 style={{ fontSize:22, color:"#2C2420", fontWeight:600, margin:"12px 0 4px" }}>{sel.pac}</h2>
              <p style={{ fontSize:14, color:"#6B5C56", margin:"0 0 16px", fontFamily:"'Raleway',sans-serif" }}>{sel.proto}</p>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}><Ico n="wa" size={16} color="#8FAF8A"/><span style={{ fontSize:14, color:"#A89890", fontFamily:"'Raleway',sans-serif" }}>{sel.cel}</span></div>
            </div>
            {pr && <div style={{...S.card, background:"#EBF1EA", border:"1px solid #B8CEB5"}}>
              <p style={{...S.lbl, color:"#6D8F68", marginBottom:10}}>Indicaciones enviadas</p>
              {pr.prep.map((item,i)=><div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}><div style={{ width:5, height:5, borderRadius:"50%", background:"#8FAF8A", marginTop:6, flexShrink:0 }}/><p style={{ fontSize:12, color:"#6B5C56", margin:0, fontFamily:"'Raleway',sans-serif", lineHeight:1.5 }}>{item}</p></div>)}
            </div>}
            <div style={{ display:"flex", gap:10 }}>
              <button style={{...S.btnS, flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6}}><Ico n="edt" size={14} color="#2C2420"/> Editar</button>
              <button style={{...S.btnD, flex:1}}>Cancelar</button>
            </div>
            <div style={{...S.card, marginTop:12, textAlign:"center"}}>
              <p style={{...S.lbl}}>Recordatorio manual</p>
              <button style={{...S.btnS, display:"inline-flex", alignItems:"center", gap:8, marginTop:8}}><Ico n="wa" size={15} color="#2C2420"/> Enviar por WhatsApp</button>
            </div>
          </>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <h1 style={{...S.hTitle}}>Todos los turnos</h1>
          <p style={{...S.hSub}}>Agenda completa</p>
        </div>
      </div>
      <div style={{ padding:"16px 20px 0" }}>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:16 }}>
          {[{l:"Total",v:stats.tot,c:"#2C2420"},{l:"Confirm.",v:stats.conf,c:"#7BA68A"},{l:"Pendient.",v:stats.pend,c:"#C8A46A"},{l:"Libres",v:stats.libres,c:"#A89890"}].map(s=>(
            <div key={s.l} style={{...S.card, padding:"12px 8px", textAlign:"center", marginBottom:0}}>
              <p style={{ fontSize:22, color:s.c, margin:0, fontFamily:"'Raleway',sans-serif", fontWeight:800 }}>{s.v}</p>
              <p style={{ fontSize:8, color:"#A89890", margin:"2px 0 0", fontFamily:"'Raleway',sans-serif", textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.l}</p>
            </div>
          ))}
        </div>
        {/* Filtros */}
        <div style={{ display:"flex", gap:8, marginBottom:16, overflowX:"auto", paddingBottom:4 }}>
          {[{v:"todos",l:"Todos"},{v:"confirmado",l:"Confirmados"},{v:"pendientes",l:"Pendientes"},{v:"libres",l:"Disponibles"}].map(f=>(
            <button key={f.v} onClick={()=>setFiltro(f.v)} style={{ flexShrink:0, padding:"7px 16px", borderRadius:50, border:`1.5px solid ${filtro===f.v?"#8FAF8A":"#DDD0C8"}`, background:filtro===f.v?"#8FAF8A":"#fff", color:filtro===f.v?"#fff":"#6B5C56", fontSize:12, fontFamily:"'Raleway',sans-serif", fontWeight:600, cursor:"pointer" }}>{f.l}</button>
          ))}
        </div>
        {/* Turnos agrupados por fecha */}
        {Object.entries(porFecha).map(([fecha, ts])=>(
          <div key={fecha} style={{ marginBottom:8 }}>
            <p style={{...S.lbl, marginBottom:8}}>{fecha}</p>
            {ts.map(t=>(
              <div key={t.id} style={{...S.card, cursor:"pointer", display:"flex", alignItems:"center", gap:12, padding:"14px 16px", marginBottom:8}} onClick={()=>setSel(t)}>
                <p style={{ fontSize:14, color:"#2C2420", fontWeight:700, margin:0, fontFamily:"'Raleway',sans-serif", minWidth:44 }}>{t.hora}</p>
                <div style={{ width:1, height:32, background:"#DDD0C8" }}/>
                <div style={{ flex:1 }}>
                  {t.est==="libre"
                    ? <p style={{ fontSize:13, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif", fontStyle:"italic" }}>Disponible</p>
                    : <><p style={{ fontSize:14, color:"#2C2420", margin:"0 0 2px", fontWeight:600 }}>{t.pac}</p><p style={{ fontSize:11, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif" }}>{t.proto}</p></>
                  }
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}><Badge estado={t.est}/><Ico n="chv" size={14} color="#A89890"/></div>
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
  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative", display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}><h1 style={{...S.hTitle}}>Disponibilidad</h1><p style={{...S.hSub}}>Próximos 6 meses</p></div>
        <button onClick={()=>setModal(true)} style={{...S.btnP, width:"auto", padding:"10px 20px", fontSize:12, position:"relative", zIndex:1}}>+ Agregar</button>
      </div>
      <div style={{ padding:20 }}>
        {DISPONIBLES.map((d,i)=>(
          <div key={i} style={{...S.card}}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <p style={{ fontSize:15, color:"#2C2420", margin:0, fontWeight:600 }}>{d.f}</p>
              <span style={{ fontSize:11, fontFamily:"'Raleway',sans-serif", fontWeight:700, color:"#6D8F68", background:"#EBF1EA", padding:"3px 10px", borderRadius:50 }}>{d.slots.length} slots</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {d.slots.map(h=><div key={h} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:50, background:"#F5EDE6", border:"1px solid #DDD0C8" }}><span style={{ fontSize:12, fontFamily:"'Raleway',sans-serif", color:"#2C2420", fontWeight:600 }}>{h}</span><button style={{ background:"none", border:"none", cursor:"pointer", color:"#A89890", padding:0, fontSize:14, lineHeight:1 }}>×</button></div>)}
            </div>
          </div>
        ))}
      </div>
      {modal && <div style={{ position:"fixed", inset:0, background:"rgba(44,36,32,0.4)", display:"flex", alignItems:"flex-end", zIndex:200 }}>
        <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", padding:"28px 24px 44px", width:"100%", maxWidth:430, margin:"0 auto" }}>
          <h3 style={{ fontSize:20, color:"#2C2420", fontWeight:600, margin:"0 0 20px" }}>Agregar disponibilidad</h3>
          <label style={{...S.lbl}}>Fecha</label><input type="date" style={{...S.inp, marginBottom:16}}/>
          <label style={{...S.lbl}}>Hora</label><input type="time" style={{...S.inp, marginBottom:24}}/>
          <div style={{ display:"flex", gap:10 }}>
            <button style={{...S.btnS, flex:1}} onClick={()=>setModal(false)}>Cancelar</button>
            <button style={{...S.btnP, flex:1}} onClick={()=>setModal(false)}>Guardar</button>
          </div>
        </div>
      </div>}
    </div>
  );
}

function AdminPacientes() {
  const pacs = [
    {n:"María López",c:"+54 9 11 1234-5678",t:3,u:"19 may"},{n:"Sofía Martínez",c:"+54 9 11 8765-4321",t:5,u:"21 may"},
    {n:"Ana Rodríguez",c:"+54 9 11 5555-1234",t:1,u:"16 may"},{n:"Laura Fernández",c:"+54 9 11 9999-0000",t:2,u:"14 may"},
    {n:"Carla Ruiz",c:"+54 9 11 3333-7777",t:4,u:"15 may"},
  ];
  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}><div style={{...S.hAccent}}/><div style={{ position:"relative", zIndex:1 }}><h1 style={{...S.hTitle}}>Pacientes</h1><p style={{...S.hSub}}>{pacs.length} registradas</p></div></div>
      <div style={{ padding:20 }}>
        {pacs.map((p,i)=>(
          <div key={i} style={{...S.card, display:"flex", alignItems:"center", gap:14}}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:"#E8D5C8", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><span style={{ fontSize:18, color:"#2C2420", fontWeight:600 }}>{p.n[0]}</span></div>
            <div style={{ flex:1 }}><p style={{ fontSize:15, color:"#2C2420", margin:"0 0 2px", fontWeight:600 }}>{p.n}</p><p style={{ fontSize:12, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif" }}>{p.c}</p></div>
            <div style={{ textAlign:"right" }}><p style={{ fontSize:14, color:"#2C2420", margin:"0 0 2px", fontFamily:"'Raleway',sans-serif", fontWeight:700 }}>{p.t}</p><p style={{ fontSize:10, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif", textTransform:"uppercase" }}>{p.u}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [rol, setRol] = useState(null);
  const [tabP, setTabP] = useState("disponibles");
  const [tabA, setTabA] = useState("turnos");

  if(!rol) return <Login onLogin={setRol}/>;

  if(rol==="paciente") return (
    <div style={{...S.app}}>
      <Fonts/>
      {tabP==="disponibles" && <TurnosDisponibles/>}
      {tabP==="misturnos"   && <MisTurnos/>}
      <nav style={{...S.nav}}>
        {[{id:"disponibles",ic:import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";

const LOGO = "data:image/png;base64,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";

const C = {
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

const nb = (a) => ({ display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", color:a?"#8FAF8A":"#A89890", fontSize:10, fontFamily:"'Raleway',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:a?700:500 });

const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Raleway:wght@300;400;500;600;700;800&display=swap');
    .marca-title {
      font-family: 'Trebuchet MS', 'Century Gothic', 'Gill Sans', Arial, sans-serif !important;
      font-weight: 700 !important;
      letter-spacing: 0.06em !important;
      font-size: 32px !important;
    }
  `}</style>
);

const Ico = ({ n, size=22, color="currentColor" }) => {
  const p = { fill:"none", stroke:color, strokeWidth:"1.8", strokeLinecap:"round", strokeLinejoin:"round" };
  const m = {
    cal:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    home: <svg width={size} height={size} viewBox="0 0 24 24" {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    usr:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    usrs: <svg width={size} height={size} viewBox="0 0 24 24" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    chk:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
    clk:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    edt:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    bck:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><polyline points="15 18 9 12 15 6"/></svg>,
    chv:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><polyline points="9 18 15 12 9 6"/></svg>,
    lf:   <svg width={size} height={size} viewBox="0 0 24 24" {...p}><path d="M17 8C8 10 5.9 16.17 3.82 19.43L5.71 21l1-1.07A4.67 4.67 0 008 21c9 0 15-9 11-18A13.5 13.5 0 013 3c0 9 4 15 13 18"/></svg>,
    inf:  <svg width={size} height={size} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    wa:   <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  };
  return m[n] || null;
};

const Badge = ({ estado }) => {
  const map = {
    confirmado:{ bg:"#EBF1EA", text:"#6D8F68", label:"Confirmado" },
    pendiente: { bg:"#FBF3E4", text:"#C8A46A", label:"Pendiente"  },
    cancelado: { bg:"#FAE8E8", text:"#B86060", label:"Cancelado"  },
    libre:     { bg:"#F5EDE6", text:"#6B5C56", label:"Disponible" },
  };
  const s = map[estado] || map.pendiente;
  return <span style={{ display:"inline-block", padding:"3px 12px", borderRadius:50, fontSize:11, fontFamily:"'Raleway',sans-serif", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", backgroundColor:s.bg, color:s.text }}>{s.label}</span>;
};

const PROTOS = [
  { id:1, nombre:"Limpieza facial profunda", dur:60, prep:["Llegar sin maquillaje ni base","No aplicar cremas ni protector solar el día del turno","Informar si tomás medicación fotosensibilizante"] },
  { id:2, nombre:"Peeling químico", dur:45, prep:["Suspender retinol y ácidos 5 días antes","No depilar la zona 48 hs antes","Llegar con piel limpia y sin maquillaje","Evitar sol intenso 3 días previos"] },
  { id:3, nombre:"Hidratación intensiva", dur:30, prep:["Llegar con piel limpia","No se requiere preparación especial"] },
  { id:4, nombre:"Láser fraccionado", dur:90, prep:["Evitar sol 2 semanas previas con FPS 50","Suspender retinoides y ácidos 7 días antes","No realizar otros tratamientos 15 días previos","Llegar sin maquillaje","Informar si tomás anticoagulantes"] },
  { id:5, nombre:"Consulta inicial", dur:30, prep:["Podés venir con o sin maquillaje","Traer lista de medicamentos si los tenés"] },
  { id:6, nombre:"Microdermoabrasión", dur:50, prep:["No exfoliar la zona 3 días antes","Llegar sin maquillaje","Evitar sol intenso 48 hs antes"] },
];

const DISPONIBLES = [
  { f:"Lun 19 may", slots:["09:00","10:00","15:00","16:00"] },
  { f:"Mar 20 may", slots:["09:00","11:00","14:00"] },
  { f:"Mié 21 may", slots:["10:00","11:00","16:00","17:00"] },
  { f:"Jue 22 may", slots:["09:00","15:00"] },
  { f:"Vie 23 may", slots:["10:00","14:00","15:00"] },
  { f:"Lun 26 may", slots:["09:00","10:00","14:00"] },
  { f:"Mar 27 may", slots:["11:00","15:00","16:00"] },
  { f:"Mié 28 may", slots:["09:00","10:00","17:00"] },
];

// TODOS los turnos para el admin (pasados, hoy, futuros)
const TODOS_TURNOS = [
  { id:1,  fecha:"Lun 12 may", hora:"09:00", pac:"Carla Ruiz",      proto:"Consulta inicial",         est:"confirmado", cel:"+54 9 11 3333-7777" },
  { id:2,  fecha:"Lun 12 may", hora:"10:00", pac:"Ana Rodríguez",   proto:"Hidratación intensiva",    est:"confirmado", cel:"+54 9 11 5555-1234" },
  { id:3,  fecha:"Mar 13 may", hora:"11:00", pac:"Sofía Martínez",  proto:"Peeling químico",          est:"cancelado",  cel:"+54 9 11 8765-4321" },
  { id:4,  fecha:"Mié 14 may", hora:"09:00", pac:"María López",     proto:"Limpieza facial profunda", est:"confirmado", cel:"+54 9 11 1234-5678" },
  { id:5,  fecha:"Mié 14 may", hora:"10:00", pac:"",                proto:"",                         est:"libre",      cel:"" },
  { id:6,  fecha:"Mié 14 may", hora:"15:00", pac:"Laura Fernández", proto:"Láser fraccionado",        est:"confirmado", cel:"+54 9 11 9999-0000" },
  { id:7,  fecha:"Jue 15 may", hora:"09:00", pac:"Carla Ruiz",      proto:"Microdermoabrasión",       est:"pendiente",  cel:"+54 9 11 3333-7777" },
  { id:8,  fecha:"Jue 15 may", hora:"11:00", pac:"",                proto:"",                         est:"libre",      cel:"" },
  { id:9,  fecha:"Vie 16 may", hora:"10:00", pac:"Ana Rodríguez",   proto:"Consulta inicial",         est:"confirmado", cel:"+54 9 11 5555-1234" },
  { id:10, fecha:"Lun 19 may", hora:"09:00", pac:"",                proto:"",                         est:"libre",      cel:"" },
  { id:11, fecha:"Lun 19 may", hora:"15:00", pac:"María López",     proto:"Peeling químico",          est:"pendiente",  cel:"+54 9 11 1234-5678" },
  { id:12, fecha:"Mar 20 may", hora:"10:00", pac:"",                proto:"",                         est:"libre",      cel:"" },
  { id:13, fecha:"Mié 21 may", hora:"14:00", pac:"Sofía Martínez",  proto:"Hidratación intensiva",    est:"confirmado", cel:"+54 9 11 8765-4321" },
];

function Login({ onLogin }) {
  const [paso, setPaso] = useState(1);
  const [cel, setCel] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [load, setLoad] = useState(false);

  const verificarCelular = async () => {
    if(cel.length<8) return;
    setLoad(true);
    const { data } = await supabase
      .from("pacientes")
      .select("*")
      .eq("celular", cel)
      .single();
    setLoad(false);
    if(data) {
      onLogin("paciente", data);
    } else {
      setPaso(2);
    }
  };

  const completarPerfil = async () => {
    if(nombre.length<2||apellido.length<2) return;
    setLoad(true);
    const { data, error } = await supabase
      .from("pacientes")
      .insert([{ nombre, apellido, celular: cel }])
      .select()
      .single();
    setLoad(false);
    if(!error) onLogin("paciente", data);
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(180deg,#C8DBC5 0%,#F5EDE6 100%)", display:"flex", flexDirection:"column", justifyContent:"center", padding:"32px 28px" }}>
      <Fonts/>
      <div style={{ textAlign:"center", marginBottom:44 }}>
        <div style={{ width:100, height:100, borderRadius:"50%", background:"#6D8F68", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", boxShadow:"0 4px 24px rgba(44,36,32,0.15)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="68" height="68"> <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill="white" stroke="none"> <path d="M2967 5950 c-27 -10 -75 -44 -113 -79 -35 -34 -72 -61 -82 -62 -9 -1 -45 -2 -79 -3 -65 -2 -93 -16 -196 -98 -27 -21 -55 -38 -62 -38 -7 0 -35 20 -63 45 -80 72 -125 78 -168 22 -14 -17 -34 -26 -68 -30 -27 -4 -68 -18 -91 -31 -50 -30 -133 -117 -146 -154 -6 -18 -28 -37 -67 -58 -63 -34 -99 -77 -107 -133 -4 -20 -8 -47 -11 -61 -8 -38 -103 -122 -187 -164 -71 -36 -80 -38 -135 -32 -47 5 -71 2 -114 -14 -71 -26 -166 -104 -195 -159 -33 -63 -42 -71 -77 -71 -44 0 -77 -20 -99 -58 -34 -58 -39 -100 -20 -175 l17 -67 -30 -33 c-69 -74 -152 -203 -174 -269 -10 -32 -9 -43 4 -69 9 -18 16 -37 16 -43 0 -6 -22 -38 -48 -71 -91 -112 -99 -145 -52 -215 16 -25 30 -55 30 -67 0 -12 -18 -56 -41 -99 -54 -101 -50 -118 40 -204 70 -65 72 -69 96 -174 10 -45 59 -84 136 -107 l69 -21 302 51 c440 73 563 83 763 61 214 -24 454 -119 681 -267 212 -140 483 -413 560 -565 42 -83 81 -401 69 -563 -9 -121 -24 -312 -40 -490 -8 -88 -20 -220 -25 -293 -21 -261 -51 -388 -156 -644 -25 -60 -44 -119 -42 -130 4 -28 49 -61 71 -52 63 24 114 264 167 784 6 58 20 167 31 244 38 266 69 563 79 766 15 299 23 352 65 435 122 241 414 493 820 706 286 150 494 197 970 219 302 14 363 26 493 91 56 29 108 59 114 66 6 8 17 56 23 107 9 71 21 114 50 175 47 100 48 127 5 181 -29 37 -32 46 -26 86 4 32 0 58 -15 97 -20 49 -20 58 -9 148 15 114 10 142 -34 184 -18 17 -45 49 -58 71 -37 58 -57 72 -128 90 -36 9 -76 23 -88 31 -35 22 -52 73 -52 158 0 141 -47 204 -177 235 -44 10 -59 20 -97 64 -31 37 -57 56 -85 64 -29 9 -55 29 -92 73 -59 67 -83 78 -129 54 l-31 -16 -40 45 c-58 65 -127 90 -239 83 -53 -2 -98 -11 -119 -21 -18 -10 -34 -16 -35 -14 -1 2 -12 19 -24 39 -29 47 -66 62 -134 55 -57 -7 -69 -3 -86 31 -13 24 -102 88 -102 73 0 -5 16 -20 36 -34 20 -13 47 -40 60 -60 24 -35 27 -36 85 -36 56 0 64 -3 95 -34 19 -19 34 -41 34 -49 0 -26 35 -29 75 -6 24 14 59 23 103 26 88 6 167 -22 235 -85 47 -44 49 -45 86 -36 50 13 64 7 100 -43 20 -28 51 -53 90 -72 36 -19 74 -48 96 -76 32 -38 48 -48 106 -65 117 -35 147 -78 164 -235 4 -33 13 -75 21 -94 8 -18 11 -38 7 -44 -3 -6 -1 -7 5 -3 6 4 22 0 34 -7 13 -8 41 -18 63 -22 62 -11 95 -33 115 -77 10 -22 39 -60 65 -83 l47 -44 -7 -82 c-3 -46 -9 -87 -11 -91 -8 -12 17 -128 27 -128 5 0 9 -28 9 -63 0 -62 15 -101 47 -120 7 -4 13 -17 13 -29 0 -22 -58 -138 -70 -138 -4 0 -7 -6 -8 -12 -1 -7 -7 -48 -13 -90 -11 -65 -16 -78 -33 -81 -19 -4 -19 -4 2 -6 25 -1 30 -28 10 -53 -7 -8 -56 -34 -109 -57 -120 -51 -212 -66 -519 -81 -338 -16 -463 -34 -633 -92 -199 -66 -412 -175 -642 -326 -103 -68 -161 -117 -278 -232 -81 -80 -147 -142 -147 -137 0 4 11 25 25 48 14 22 23 44 20 48 -6 10 74 135 129 201 77 93 275 286 387 376 259 208 689 506 929 643 69 40 211 115 317 169 106 53 190 98 188 100 -1 2 -111 -50 -242 -116 -389 -194 -833 -455 -1038 -610 -56 -43 -195 -171 -315 -291 -118 -118 -210 -208 -204 -200 139 180 201 256 290 348 126 131 188 184 469 398 116 87 274 209 352 270 123 97 242 180 373 261 59 37 26 24 -49 -18 -277 -157 -756 -515 -1040 -779 -247 -228 -487 -546 -622 -825 l-59 -121 4 75 c3 44 15 105 30 149 31 90 96 222 107 216 9 -6 30 51 22 59 -4 3 -1 6 6 6 7 0 9 5 6 10 -4 6 36 92 88 193 198 382 271 480 687 927 154 166 187 202 319 355 136 157 301 326 396 408 86 73 99 86 60 60 -56 -39 -209 -177 -325 -294 -181 -182 -566 -608 -714 -789 -32 -40 -26 -24 14 35 15 22 87 139 160 260 159 265 265 425 373 563 84 108 115 170 46 93 -63 -70 -219 -275 -285 -374 -34 -51 -120 -189 -191 -307 -72 -119 -189 -304 -261 -412 -165 -245 -364 -612 -438 -803 -13 -34 -20 -43 -22 -30 -8 59 210 614 372 948 100 206 336 629 479 858 91 147 232 345 311 438 84 99 109 131 103 131 -12 0 -170 -190 -272 -325 -277 -369 -533 -822 -750 -1330 -43 -99 -99 -229 -125 -290 -59 -138 -94 -241 -141 -425 -28 -106 -38 -134 -38 -105 -2 82 20 273 40 350 11 44 29 122 40 174 10 51 55 252 98 445 43 193 97 443 120 556 65 316 145 635 190 753 6 16 11 34 10 40 -1 20 -28 -60 -74 -218 -58 -202 -80 -294 -145 -610 -44 -216 -47 -227 -140 -615 -65 -270 -120 -527 -135 -633 -17 -113 -12 -23 10 218 43 457 65 635 116 950 66 400 106 577 200 886 32 108 82 283 109 389 27 106 52 195 54 198 3 2 21 -1 41 -8 20 -7 46 -9 59 -6 15 4 34 -3 56 -19 49 -37 61 -30 15 8 -29 24 -53 34 -93 38 -45 6 -60 13 -96 48 -40 40 -44 41 -108 41 l-67 0 -38 46 -37 47 -67 -6 c-63 -5 -120 -25 -133 -46 -13 -21 -36 -160 -60 -361 -78 -645 -97 -765 -121 -765 -5 0 -16 34 -22 75 -12 70 -24 165 -104 819 -17 139 -35 264 -39 277 -8 21 -16 24 -57 24 -27 -1 -70 -9 -96 -20z m121 -22 c9 -12 19 -96 78 -658 46 -441 82 -650 114 -650 36 0 97 316 181 930 23 173 47 321 53 328 12 17 72 42 101 42 13 0 39 -18 66 -47 l44 -48 82 3 c79 3 83 2 99 -24 15 -21 16 -32 7 -62 -25 -87 -105 -361 -156 -532 -114 -383 -146 -531 -232 -1075 -22 -139 -62 -480 -81 -687 -10 -104 -21 -188 -25 -188 -16 0 -21 365 -10 645 17 398 39 790 51 910 28 263 113 602 225 900 28 76 31 93 9 52 -25 -46 -81 -207 -118 -339 -109 -390 -137 -563 -156 -958 -5 -118 -15 -312 -21 -430 -7 -133 -9 -347 -5 -560 3 -190 2 -358 -2 -375 -6 -19 -11 72 -15 255 -4 157 -10 409 -14 561 -6 287 0 398 38 674 28 204 22 204 -18 0 -33 -169 -36 -195 -40 -430 -3 -137 0 -430 7 -650 6 -220 14 -498 17 -618 6 -244 22 -275 24 -47 1 80 5 172 9 205 4 33 5 -34 2 -150 -2 -115 -8 -220 -13 -233 -5 -13 -9 -128 -10 -255 -1 -272 -11 -435 -21 -372 -9 53 -16 134 -28 337 -10 167 -54 468 -70 478 -5 3 -33 80 -63 170 -122 371 -259 674 -483 1066 -229 402 -342 633 -479 979 -65 165 -140 351 -166 413 l-47 112 31 24 c45 33 86 52 130 60 21 4 35 11 32 16 -8 13 36 40 67 40 17 0 35 -9 46 -22 9 -13 34 -39 54 -58 21 -20 47 -56 58 -81 18 -37 21 -39 16 -14 -2 17 -8 38 -11 47 -5 11 1 20 17 28 13 7 44 29 69 50 25 21 61 47 80 59 38 23 99 28 100 9 0 -10 2 -10 6 0 2 6 15 12 28 12 40 0 67 15 134 75 92 82 181 117 209 83z m-979 -575 c221 -559 257 -647 340 -813 48 -96 153 -290 233 -430 166 -291 231 -417 316 -615 172 -403 268 -705 288 -910 4 -38 4 -68 1 -65 -8 8 -94 223 -144 360 -44 124 -140 334 -319 695 -125 253 -237 459 -347 635 -251 404 -250 402 -487 880 -62 124 -116 230 -122 235 -5 6 2 -12 15 -40 13 -27 52 -108 86 -180 175 -363 237 -483 326 -630 174 -286 450 -773 443 -780 -2 -3 -27 27 -56 65 -29 38 -119 150 -200 247 -269 322 -391 502 -562 828 -88 168 -166 301 -182 311 -6 4 -9 3 -6 -2 106 -182 159 -276 214 -385 160 -316 249 -441 782 -1098 93 -115 111 -159 25 -63 -31 35 -136 135 -233 222 -261 234 -410 403 -508 579 -218 388 -281 487 -386 602 -55 62 -50 51 21 -41 76 -98 152 -219 243 -385 45 -83 93 -170 106 -195 l25 -45 -37 40 c-20 22 -33 33 -29 25 5 -8 -29 20 -76 63 -159 148 -230 195 -551 361 -104 54 -188 101 -188 106 0 14 88 80 133 100 31 14 63 19 117 17 90 -2 131 15 236 93 76 58 112 105 138 186 19 59 53 94 118 122 45 20 55 30 100 111 9 17 21 31 25 31 5 0 51 -107 102 -237z m-791 -539 c236 -129 283 -157 377 -228 135 -102 384 -353 570 -575 l30 -36 -31 22 c-18 13 -112 98 -211 191 -193 181 -314 277 -461 366 -111 68 -289 157 -424 211 -54 22 -98 43 -98 46 0 14 52 99 61 99 6 0 90 -43 187 -96z m-142 -63 c185 -78 434 -230 619 -378 55 -44 172 -144 260 -223 88 -78 200 -170 248 -202 169 -113 486 -412 576 -542 29 -42 51 -79 49 -81 -2 -3 -49 48 -104 112 -128 151 -234 242 -474 410 -107 75 -262 189 -345 252 -82 64 -204 152 -271 197 -216 144 -644 374 -771 414 -38 12 -41 15 -31 34 26 50 40 59 94 53 29 -3 96 -24 150 -46z m-151 -84 c44 -19 125 -60 180 -92 55 -32 170 -99 255 -148 194 -111 323 -196 470 -309 210 -162 374 -283 473 -352 132 -91 206 -153 305 -255 205 -210 319 -405 454 -776 33 -91 32 -90 -45 23 -97 142 -207 272 -367 432 -172 172 -316 286 -478 378 -297 169 -808 353 -1042 377 -154 15 -333 50 -462 92 -42 13 -47 17 -38 33 6 10 10 28 10 39 0 11 7 24 17 29 14 9 14 10 -5 16 -35 12 -29 69 15 144 31 52 40 61 57 56 18 -6 19 -5 7 10 -11 14 -11 16 2 16 10 0 14 6 11 13 -6 17 72 107 93 107 21 0 78 -35 338 -206 127 -83 280 -180 340 -216 119 -70 477 -258 491 -258 10 0 -44 31 -250 142 -201 108 -358 203 -626 378 -124 81 -241 155 -260 166 -39 23 -58 68 -59 147 -1 58 4 59 114 14z m-211 -656 c130 -37 225 -57 361 -76 165 -23 257 -43 390 -87 408 -136 724 -295 955 -481 117 -94 358 -336 466 -467 93 -113 216 -290 201 -290 -3 0 -40 44 -82 98 -99 124 -349 371 -490 485 -229 184 -450 309 -683 386 -68 22 -250 70 -405 106 -155 37 -306 73 -335 82 -30 8 -55 13 -58 10 -6 -5 220 -73 441 -132 259 -70 400 -114 514 -162 272 -113 501 -272 761 -528 134 -132 199 -202 110 -119 -348 323 -744 546 -1130 636 -69 16 -215 52 -325 80 -110 28 -249 62 -309 75 -116 25 -377 65 -383 59 -3 -2 29 -9 69 -16 196 -30 301 -55 469 -109 101 -33 238 -71 304 -86 246 -55 287 -67 496 -151 185 -74 339 -146 339 -159 0 -2 -37 13 -82 34 -95 44 -177 73 -263 95 -115 29 -764 155 -925 180 -85 13 -476 46 -549 46 -66 0 -78 64 -25 143 35 53 35 106 0 176 -34 67 -30 101 20 159 20 23 38 42 41 42 3 0 51 -13 107 -29z m181 -532 c99 -11 239 -34 310 -50 172 -41 343 -78 435 -94 69 -12 45 -13 -291 -14 -472 -1 -666 16 -691 62 -6 12 -34 46 -62 75 l-51 54 85 -7 c47 -4 166 -15 265 -26z m-85 -158 c25 -6 137 -16 250 -22 113 -6 212 -13 220 -16 8 -3 -59 -20 -150 -39 -234 -47 -342 -44 -409 11 -27 23 -55 78 -45 88 5 4 57 -4 134 -22z m2507 -188 c-3 -10 -5 -2 -5 17 0 19 2 27 5 18 2 -10 2 -26 0 -35z"/> <path d="M2992 5818 c-26 -188 -35 -336 -36 -573 -1 -260 2 -290 55 -621 16 -99 38 -259 49 -355 44 -367 69 -603 66 -606 -6 -6 -61 239 -115 507 -27 135 -77 378 -111 540 -75 359 -112 563 -136 737 -10 73 -20 131 -22 128 -8 -7 18 -220 49 -405 33 -195 79 -432 145 -744 24 -115 44 -214 43 -220 -1 -17 -100 289 -194 599 -84 280 -123 428 -166 624 -13 57 -25 99 -27 93 -2 -6 6 -55 18 -109 56 -262 134 -537 296 -1043 42 -129 84 -262 94 -295 19 -61 66 -255 114 -470 37 -165 37 -165 32 -165 -2 0 -30 80 -61 178 -153 475 -349 951 -620 1507 -116 237 -200 424 -224 498 -7 21 -15 37 -17 34 -10 -9 54 -167 191 -467 458 -1010 649 -1489 770 -1935 19 -72 33 -111 30 -87 -3 23 -3 42 -1 42 16 0 51 -189 91 -494 9 -65 20 -128 25 -140 15 -36 11 140 -5 249 -8 54 -20 183 -25 285 -5 102 -14 264 -20 360 -6 96 -15 294 -20 440 -7 176 -18 324 -35 440 l-24 175 5 -110 c2 -60 11 -229 19 -375 16 -282 45 -912 44 -939 0 -9 -18 56 -39 143 -43 173 -73 358 -90 556 -25 283 -74 664 -121 950 -48 289 -56 636 -23 984 16 173 14 216 -4 84z"/> <path d="M3552 5780 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z"/> <path d="M2722 5715 c0 -16 2 -22 5 -12 2 9 2 23 0 30 -3 6 -5 -1 -5 -18z"/> <path d="M3543 5700 c0 -25 2 -35 4 -22 2 12 2 32 0 45 -2 12 -4 2 -4 -23z"/> <path d="M2732 5640 c0 -19 2 -27 5 -17 2 9 2 25 0 35 -3 9 -5 1 -5 -18z"/> <path d="M3530 5621 c0 -16 -14 -110 -31 -208 -31 -182 -47 -306 -30 -233 38 158 82 470 67 470 -3 0 -6 -13 -6 -29z"/> <path d="M3452 5115 c0 -16 2 -22 5 -12 2 9 2 23 0 30 -3 6 -5 -1 -5 -18z"/> <path d="M3442 5050 c0 -19 2 -27 5 -17 2 9 2 25 0 35 -3 9 -5 1 -5 -18z"/> <path d="M3425 4917 c-4 -53 -5 -101 -3 -109 3 -7 9 33 13 90 4 57 5 105 2 108 -3 3 -8 -37 -12 -89z"/> <path d="M3221 3084 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z"/> <path d="M3232 3040 c0 -14 4 -38 8 -55 7 -27 8 -27 8 -5 0 14 -4 39 -8 55 -7 27 -8 27 -8 5z"/> <path d="M3252 2930 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z"/> <path d="M1335 4973 c6 -5 57 -43 115 -83 105 -75 185 -149 384 -358 128 -136 125 -119 -6 28 -130 147 -235 248 -326 312 -74 53 -188 122 -167 101z"/> <path d="M894 4356 c11 -9 24 -16 30 -16 12 0 7 5 -24 19 -24 11 -24 11 -6 -3z"/> <path d="M894 4326 c11 -9 24 -16 30 -16 12 0 7 5 -24 19 -24 11 -24 11 -6 -3z"/> <path d="M980 4286 c0 -2 7 -7 16 -10 8 -3 12 -2 9 4 -6 10 -25 14 -25 6z"/> <path d="M1040 4257 c0 -7 132 -79 136 -74 2 2 -28 20 -66 41 -39 20 -70 35 -70 33z"/> <path d="M1190 4176 c0 -3 9 -10 20 -16 11 -6 20 -8 20 -6 0 3 -9 10 -20 16 -11 6 -20 8 -20 6z"/> <path d="M1260 4136 c0 -6 201 -102 325 -156 61 -26 205 -82 320 -124 376 -138 444 -168 572 -252 165 -109 382 -350 515 -575 28 -49 54 -87 55 -85 5 5 -99 184 -150 261 -140 208 -307 378 -466 474 -68 41 -281 132 -293 125 -5 -3 -34 4 -66 15 -363 126 -527 190 -699 271 -108 51 -113 53 -113 46z"/> <path d="M830 4122 c8 -5 26 -13 40 -16 17 -5 20 -4 10 2 -8 5 -26 13 -40 16 -17 5 -20 4 -10 -2z"/> <path d="M901 4096 c10 -9 149 -76 149 -71 0 5 -136 75 -146 75 -4 0 -5 -2 -3 -4z"/> <path d="M1065 3795 c17 -8 37 -14 45 -14 8 0 -1 7 -20 14 -46 18 -64 17 -25 0z"/> <path d="M4010 5430 c-17 -50 -30 -93 -28 -96 3 -2 19 37 36 88 18 50 31 93 29 95 -2 2 -19 -37 -37 -87z"/> <path d="M4629 5423 c-196 -210 -489 -654 -668 -1011 -100 -199 -250 -553 -315 -744 -25 -71 -10 -54 24 29 210 510 302 707 443 956 185 324 292 480 536 778 33 41 22 36 -20 -8z"/> <path d="M4106 5278 c-74 -234 -145 -460 -166 -533 -25 -83 -50 -165 -105 -340 -51 -161 -142 -461 -180 -590 -24 -80 -28 -119 -5 -48 62 193 232 644 336 893 76 181 178 347 337 548 49 63 87 115 85 117 -4 4 -118 -129 -180 -211 -123 -162 -215 -335 -329 -622 -40 -100 -74 -181 -76 -179 -8 9 102 311 148 405 60 123 209 398 286 527 29 50 42 77 28 60 -33 -40 -186 -298 -270 -455 -64 -121 -77 -131 -29 -21 13 29 24 64 24 76 0 13 34 133 76 267 94 301 87 278 81 278 -3 0 -30 -78 -61 -172z"/> <path d="M4339 5383 c-13 -16 -12 -17 4 -4 9 7 17 15 17 17 0 8 -8 3 -21 -13z"/> <path d="M3956 5274 c-9 -26 -16 -52 -15 -58 0 -6 9 13 20 43 10 30 17 56 15 58 -2 2 -11 -17 -20 -43z"/> <path d="M4749 4963 c-13 -16 -12 -17 4 -4 9 7 17 15 17 17 0 8 -8 3 -21 -13z"/> <path d="M5378 4931 c-124 -72 -243 -160 -509 -373 -297 -238 -352 -285 -488 -407 -153 -139 -438 -472 -554 -648 -63 -96 -184 -313 -174 -313 3 0 27 39 53 88 195 358 515 715 1019 1138 367 308 503 412 671 513 37 23 63 41 58 41 -5 0 -39 -17 -76 -39z"/> <path d="M5500 4710 c-8 -5 -10 -10 -5 -10 6 0 17 5 25 10 8 5 11 10 5 10 -5 0 -17 -5 -25 -10z"/> <path d="M5345 4634 c-66 -36 -127 -73 -135 -81 -8 -9 5 -4 30 10 25 15 91 51 145 82 55 30 95 55 90 55 -6 0 -64 -30 -130 -66z"/> <path d="M5074 4472 c-343 -213 -708 -512 -1035 -848 -194 -200 -314 -354 -418 -534 -32 -55 -61 -97 -65 -93 -3 3 -6 1 -6 -6 0 -7 -20 -60 -45 -117 -59 -135 -57 -146 4 -19 60 127 177 315 277 447 96 127 358 388 651 651 325 292 440 381 739 574 11 6 16 12 13 12 -3 1 -55 -30 -115 -67z"/> <path d="M5820 4400 c-8 -5 -10 -10 -5 -10 6 0 17 5 25 10 8 5 11 10 5 10 -5 0 -17 -5 -25 -10z"/> <path d="M5258 4364 c-38 -20 -36 -28 2 -9 17 9 30 18 30 20 0 7 -1 6 -32 -11z"/> <path d="M5640 4320 c-9 -6 -10 -10 -3 -10 6 0 15 5 18 10 8 12 4 12 -15 0z"/> <path d="M5550 4280 c-19 -11 -31 -19 -27 -20 11 0 67 29 67 35 0 7 -1 7 -40 -15z"/> <path d="M5625 4116 c-362 -127 -677 -273 -955 -444 -365 -225 -638 -414 -750 -521 -41 -38 -28 -30 50 31 58 46 179 130 270 188 91 57 244 154 340 215 414 263 670 389 1068 526 97 33 178 62 181 64 13 14 -41 -2 -204 -59z"/> <path d="M5858 4003 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z"/> <path d="M5808 3993 c6 -2 18 -2 25 0 6 3 1 5 -13 5 -14 0 -19 -2 -12 -5z"/> <path d="M5640 3960 c-20 -6 -21 -8 -5 -8 11 0 29 3 40 8 25 11 -1 11 -35 0z"/> <path d="M5447 3910 c-214 -63 -390 -131 -551 -212 -127 -64 -541 -304 -661 -382 -287 -190 -409 -267 -392 -249 9 11 17 24 17 29 0 22 -271 -269 -294 -316 -4 -8 2 -4 14 10 98 113 128 144 187 193 113 92 622 417 763 487 36 18 143 75 237 127 234 129 424 214 633 284 185 61 210 77 47 29z"/> <path d="M5688 3803 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z"/> <path d="M5245 3715 c-39 -14 -40 -14 -5 -8 41 7 82 22 60 22 -8 0 -33 -7 -55 -14z"/> <path d="M5050 3660 c-63 -20 -146 -49 -183 -63 -85 -33 -438 -199 -433 -204 2 -2 88 33 192 77 309 132 324 138 454 185 152 54 130 58 -30 5z"/> <path d="M5705 3640 c-42 -11 -1 -11 50 -1 34 7 35 9 10 9 -16 0 -43 -4 -60 -8z"/> <path d="M5633 3623 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z"/> <path d="M5548 3613 c6 -2 18 -2 25 0 6 3 1 5 -13 5 -14 0 -19 -2 -12 -5z"/> <path d="M5410 3595 c-36 -7 -54 -13 -40 -13 14 0 57 5 95 12 39 8 57 14 40 14 -16 0 -59 -6 -95 -13z"/> <path d="M5303 3573 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z"/> <path d="M5175 3555 c-33 -7 -51 -13 -40 -13 11 -1 49 5 85 12 36 8 54 14 40 14 -14 0 -52 -6 -85 -13z"/> <path d="M4940 3510 c-69 -16 -159 -40 -200 -54 -84 -29 -74 -27 90 14 63 16 153 38 200 49 47 10 74 19 60 19 -14 0 -81 -13 -150 -28z"/> <path d="M3635 3169 c-4 -6 -5 -12 -2 -15 2 -3 7 2 10 11 7 17 1 20 -8 4z"/> </g> </svg>
        </div>
        <h1 className="marca-title" style={{ fontSize:30, color:"#2C2420", margin:0 }}>Mara Serena</h1>
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
            {load?"Verificando...":"Ingresar"}
          </button>
        </>}

        {paso===2 && <>
          <h2 style={{ fontSize:21, color:"#2C2420", fontWeight:600, margin:"0 0 6px" }}>¡Bienvenida!</h2>
          <p style={{ fontSize:13, color:"#A89890", margin:"0 0 24px", fontFamily:"'Raleway',sans-serif", lineHeight:1.6 }}>Completá tus datos para terminar de registrarte.</p>
          <label style={{...S.lbl}}>Nombre</label>
          <input style={{...S.inp, marginBottom:16}} placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)}/>
          <label style={{...S.lbl}}>Apellido</label>
          <input style={{...S.inp, marginBottom:20}} placeholder="Apellido" value={apellido} onChange={e=>setApellido(e.target.value)}/>
          <button style={{...S.btnP}} onClick={completarPerfil} disabled={load||nombre.length<2||apellido.length<2}>
            {load?"Guardando...":"Comenzar"}
          </button>
        </>}
      </div>
      <button onClick={()=>onLogin("admin")} style={{ background:"none", border:"none", cursor:"pointer", color:"#A89890", fontSize:11, fontFamily:"'Raleway',sans-serif", marginTop:28, textDecoration:"underline" }}>Acceso administración</button>
    </div>
  );
}

function TurnosDisponibles() {
  const [dIdx, setDIdx] = useState(null);
  const [hora, setHora] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [ok, setOk] = useState(false);

  const DISPONIBLES = [
    { f:"Lun 19 may", slots:["09:00","10:00","15:00","16:00"] },
    { f:"Mar 20 may", slots:["09:00","11:00","14:00"] },
    { f:"Mié 21 may", slots:["10:00","11:00","16:00","17:00"] },
    { f:"Jue 22 may", slots:["09:00","15:00"] },
    { f:"Vie 23 may", slots:["10:00","14:00","15:00"] },
    { f:"Lun 26 may", slots:["09:00","10:00","14:00"] },
    { f:"Mar 27 may", slots:["11:00","15:00","16:00"] },
    { f:"Mié 28 may", slots:["09:00","10:00","17:00"] },
  ];

  if(ok) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center", background:"linear-gradient(160deg,#EBF1EA 0%,#FAF5F1 100%)" }}>
      <Fonts/>
      <div style={{ width:88, height:88, borderRadius:"50%", background:"#EBF1EA", border:"2px solid #8FAF8A", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
        <Ico n="chk" size={40} color="#8FAF8A"/>
      </div>
      <h2 style={{ fontSize:28, color:"#2C2420", fontWeight:600, margin:"0 0 8px" }}>¡Turno reservado!</h2>
      <p style={{ fontSize:15, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", lineHeight:1.7, margin:"0 0 16px" }}>
        <strong style={{ color:"#2C2420" }}>{DISPONIBLES[dIdx]?.f} · {hora} hs</strong>
      </p>
      <div style={{...S.card, maxWidth:320, margin:"0 0 24px", textAlign:"left"}}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}><Ico n="wa" size={14} color="#8FAF8A"/><span style={{ fontSize:11, color:"#8FAF8A", fontFamily:"'Raleway',sans-serif", fontWeight:700, textTransform:"uppercase" }}>WhatsApp enviado</span></div>
        <p style={{ fontSize:12, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", margin:"0 0 12px", lineHeight:1.5, fontWeight:600 }}>Recordá estas indicaciones generales:</p>
        {[
          "Llegar sin maquillaje ni base",
          "No aplicar cremas ni protector solar el día del turno",
          "Avisanos si estás tomando alguna medicación",
          "Si no podés asistir, comunicate con nosotros"
        ].map((item,i)=>(
          <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"#8FAF8A", marginTop:5, flexShrink:0 }}/>
            <p style={{ fontSize:12, color:"#6B5C56", margin:0, fontFamily:"'Raleway',sans-serif", lineHeight:1.5 }}>{item}</p>
          </div>
        ))}
        <p style={{ fontSize:11, color:"#A89890", fontFamily:"'Raleway',sans-serif", margin:"12px 0 0", lineHeight:1.5 }}>48 hs antes te enviamos un recordatorio para confirmar tu asistencia.</p>
      </div>
      <button style={{...S.btnP}} onClick={()=>{setOk(false);setDIdx(null);setHora(null);setMensaje("");}}>Reservar otro turno</button>
    </div>
  );

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <h1 style={{...S.hTitle}}>Turnos disponibles</h1>
          <p style={{...S.hSub}}>Próximos 6 meses</p>
        </div>
      </div>
      <div style={{ padding:"20px" }}>
        <p style={{ fontSize:14, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", margin:"0 0 16px" }}>Elegí el día y horario que te quede mejor:</p>

        {DISPONIBLES.map((dia,i)=>(
          <div key={i} style={{ marginBottom:16 }}>
            <p style={{...S.lbl, marginBottom:8}}>{dia.f}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {dia.slots.map(h=>{ const sel=dIdx===i&&hora===h; return (
                <button key={h} onClick={()=>{setDIdx(i);setHora(h);}} style={{ padding:"10px 20px", borderRadius:50, border:`1.5px solid ${sel?"#8FAF8A":"#DDD0C8"}`, background:sel?"#8FAF8A":"#fff", color:sel?"#fff":"#2C2420", fontSize:13, fontFamily:"'Raleway',sans-serif", cursor:"pointer", fontWeight:600 }}>{h}</button>
              ); })}
            </div>
          </div>
        ))}

        {hora && (
          <div style={{...S.card, background:"#EBF1EA", border:"1px solid #B8CEB5", marginTop:8}}>
            <p style={{...S.lbl, color:"#6D8F68", marginBottom:4}}>Turno seleccionado</p>
            <p style={{ fontSize:15, color:"#2C2420", margin:"0 0 16px", fontWeight:600 }}>{DISPONIBLES[dIdx]?.f} · {hora} hs</p>
            <label style={{...S.lbl}}>¿Querés agregar un mensaje? <span style={{ color:"#B8CEB5" }}>(opcional)</span></label>
            <textarea
              style={{...S.inp, resize:"none", height:80, fontSize:14, lineHeight:1.5}}
              placeholder="Ej: quería consultar si pueden combinar dos tratamientos..."
              value={mensaje}
              onChange={e=>setMensaje(e.target.value)}
            />
            <button style={{...S.btnP, marginTop:16}} onClick={()=>setOk(true)}>Confirmar reserva</button>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminTurnos() {
  const [sel, setSel] = useState(null);
  const [turnosDB, setTurnosDB] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from("turnos")
        .select("*, pacientes(nombre, apellido, celular)")
        .order("fecha", { ascending: true })
        .order("hora", { ascending: true });
      if(data) setTurnosDB(data);
      setCargando(false);
    };
    cargar();
  }, []);

  const todosLosTurnos = turnosDB.length > 0 ? turnosDB.map(t => ({
    id: t.id,
    fecha: t.fecha,
    hora: t.hora,
    pac: t.pacientes ? t.pacientes.nombre + " " + t.pacientes.apellido : "",
    proto: t.proto || "",
    est: t.estado,
    cel: t.pacientes?.celular || "",
    mensaje: t.mensaje || ""
  })) : [];
  const [filtro, setFiltro] = useState("todos");

  const turnos = filtro==="todos" ? TODOS_TURNOS
    : filtro==="libres"     ? TODOS_TURNOS.filter(t=>t.est==="libre")
    : filtro==="pendientes" ? TODOS_TURNOS.filter(t=>t.est==="pendiente")
    : TODOS_TURNOS.filter(t=>t.est==="confirmado");

  const porFecha = turnos.reduce((acc,t)=>{ (acc[t.fecha]=acc[t.fecha]||[]).push(t); return acc; },{});
  const TODOS_TURNOS = todosLosTurnos;
  const stats = { tot:TODOS_TURNOS.filter(t=>t.est!=="libre").length, conf:TODOS_TURNOS.filter(t=>t.est==="confirmado").length, pend:TODOS_TURNOS.filter(t=>t.est==="pendiente").length, libres:TODOS_TURNOS.filter(t=>t.est==="libre").length };

  if(sel) {
    const pr = PROTOS.find(p=>p.nombre===sel.proto);
    return (
      <div style={{ paddingBottom:100 }}>
        <div style={{...S.header, display:"flex", alignItems:"center", gap:14}}>
          <div style={{...S.hAccent}}/>
          <button onClick={()=>setSel(null)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, zIndex:1 }}><Ico n="bck" size={20} color="#2C2420"/></button>
          <div style={{ zIndex:1 }}><h1 style={{...S.hTitle}}>{sel.fecha} · {sel.hora}</h1><p style={{...S.hSub}}>Detalle del turno</p></div>
        </div>
        <div style={{ padding:20 }}>
          {sel.est==="libre" ? (
            <div style={{...S.card, textAlign:"center", padding:"32px 20px"}}>
              <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", fontSize:15, margin:"0 0 20px" }}>Horario disponible</p>
              <button style={{...S.btnP}}>+ Asignar paciente</button>
            </div>
          ):<>
            <div style={{...S.card}}>
              <Badge estado={sel.est}/>
              <h2 style={{ fontSize:22, color:"#2C2420", fontWeight:600, margin:"12px 0 4px" }}>{sel.pac}</h2>
              <p style={{ fontSize:14, color:"#6B5C56", margin:"0 0 16px", fontFamily:"'Raleway',sans-serif" }}>{sel.proto}</p>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}><Ico n="wa" size={16} color="#8FAF8A"/><span style={{ fontSize:14, color:"#A89890", fontFamily:"'Raleway',sans-serif" }}>{sel.cel}</span></div>
            </div>
            {pr && <div style={{...S.card, background:"#EBF1EA", border:"1px solid #B8CEB5"}}>
              <p style={{...S.lbl, color:"#6D8F68", marginBottom:10}}>Indicaciones enviadas</p>
              {pr.prep.map((item,i)=><div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}><div style={{ width:5, height:5, borderRadius:"50%", background:"#8FAF8A", marginTop:6, flexShrink:0 }}/><p style={{ fontSize:12, color:"#6B5C56", margin:0, fontFamily:"'Raleway',sans-serif", lineHeight:1.5 }}>{item}</p></div>)}
            </div>}
            <div style={{ display:"flex", gap:10 }}>
              <button style={{...S.btnS, flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6}}><Ico n="edt" size={14} color="#2C2420"/> Editar</button>
              <button style={{...S.btnD, flex:1}}>Cancelar</button>
            </div>
            <div style={{...S.card, marginTop:12, textAlign:"center"}}>
              <p style={{...S.lbl}}>Recordatorio manual</p>
              <button style={{...S.btnS, display:"inline-flex", alignItems:"center", gap:8, marginTop:8}}><Ico n="wa" size={15} color="#2C2420"/> Enviar por WhatsApp</button>
            </div>
          </>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <h1 style={{...S.hTitle}}>Todos los turnos</h1>
          <p style={{...S.hSub}}>Agenda completa</p>
        </div>
      </div>
      <div style={{ padding:"16px 20px 0" }}>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:16 }}>
          {[{l:"Total",v:stats.tot,c:"#2C2420"},{l:"Confirm.",v:stats.conf,c:"#7BA68A"},{l:"Pendient.",v:stats.pend,c:"#C8A46A"},{l:"Libres",v:stats.libres,c:"#A89890"}].map(s=>(
            <div key={s.l} style={{...S.card, padding:"12px 8px", textAlign:"center", marginBottom:0}}>
              <p style={{ fontSize:22, color:s.c, margin:0, fontFamily:"'Raleway',sans-serif", fontWeight:800 }}>{s.v}</p>
              <p style={{ fontSize:8, color:"#A89890", margin:"2px 0 0", fontFamily:"'Raleway',sans-serif", textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.l}</p>
            </div>
          ))}
        </div>
        {/* Filtros */}
        <div style={{ display:"flex", gap:8, marginBottom:16, overflowX:"auto", paddingBottom:4 }}>
          {[{v:"todos",l:"Todos"},{v:"confirmado",l:"Confirmados"},{v:"pendientes",l:"Pendientes"},{v:"libres",l:"Disponibles"}].map(f=>(
            <button key={f.v} onClick={()=>setFiltro(f.v)} style={{ flexShrink:0, padding:"7px 16px", borderRadius:50, border:`1.5px solid ${filtro===f.v?"#8FAF8A":"#DDD0C8"}`, background:filtro===f.v?"#8FAF8A":"#fff", color:filtro===f.v?"#fff":"#6B5C56", fontSize:12, fontFamily:"'Raleway',sans-serif", fontWeight:600, cursor:"pointer" }}>{f.l}</button>
          ))}
        </div>
        {/* Turnos agrupados por fecha */}
        {Object.entries(porFecha).map(([fecha, ts])=>(
          <div key={fecha} style={{ marginBottom:8 }}>
            <p style={{...S.lbl, marginBottom:8}}>{fecha}</p>
            {ts.map(t=>(
              <div key={t.id} style={{...S.card, cursor:"pointer", display:"flex", alignItems:"center", gap:12, padding:"14px 16px", marginBottom:8}} onClick={()=>setSel(t)}>
                <p style={{ fontSize:14, color:"#2C2420", fontWeight:700, margin:0, fontFamily:"'Raleway',sans-serif", minWidth:44 }}>{t.hora}</p>
                <div style={{ width:1, height:32, background:"#DDD0C8" }}/>
                <div style={{ flex:1 }}>
                  {t.est==="libre"
                    ? <p style={{ fontSize:13, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif", fontStyle:"italic" }}>Disponible</p>
                    : <><p style={{ fontSize:14, color:"#2C2420", margin:"0 0 2px", fontWeight:600 }}>{t.pac}</p><p style={{ fontSize:11, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif" }}>{t.proto}</p></>
                  }
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}><Badge estado={t.est}/><Ico n="chv" size={14} color="#A89890"/></div>
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
  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative", display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}><h1 style={{...S.hTitle}}>Disponibilidad</h1><p style={{...S.hSub}}>Próximos 6 meses</p></div>
        <button onClick={()=>setModal(true)} style={{...S.btnP, width:"auto", padding:"10px 20px", fontSize:12, position:"relative", zIndex:1}}>+ Agregar</button>
      </div>
      <div style={{ padding:20 }}>
        {DISPONIBLES.map((d,i)=>(
          <div key={i} style={{...S.card}}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <p style={{ fontSize:15, color:"#2C2420", margin:0, fontWeight:600 }}>{d.f}</p>
              <span style={{ fontSize:11, fontFamily:"'Raleway',sans-serif", fontWeight:700, color:"#6D8F68", background:"#EBF1EA", padding:"3px 10px", borderRadius:50 }}>{d.slots.length} slots</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {d.slots.map(h=><div key={h} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:50, background:"#F5EDE6", border:"1px solid #DDD0C8" }}><span style={{ fontSize:12, fontFamily:"'Raleway',sans-serif", color:"#2C2420", fontWeight:600 }}>{h}</span><button style={{ background:"none", border:"none", cursor:"pointer", color:"#A89890", padding:0, fontSize:14, lineHeight:1 }}>×</button></div>)}
            </div>
          </div>
        ))}
      </div>
      {modal && <div style={{ position:"fixed", inset:0, background:"rgba(44,36,32,0.4)", display:"flex", alignItems:"flex-end", zIndex:200 }}>
        <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", padding:"28px 24px 44px", width:"100%", maxWidth:430, margin:"0 auto" }}>
          <h3 style={{ fontSize:20, color:"#2C2420", fontWeight:600, margin:"0 0 20px" }}>Agregar disponibilidad</h3>
          <label style={{...S.lbl}}>Fecha</label><input type="date" style={{...S.inp, marginBottom:16}}/>
          <label style={{...S.lbl}}>Hora</label><input type="time" style={{...S.inp, marginBottom:24}}/>
          <div style={{ display:"flex", gap:10 }}>
            <button style={{...S.btnS, flex:1}} onClick={()=>setModal(false)}>Cancelar</button>
            <button style={{...S.btnP, flex:1}} onClick={()=>setModal(false)}>Guardar</button>
          </div>
        </div>
      </div>}
    </div>
  );
}

function AdminPacientes() {
  const pacs = [
    {n:"María López",c:"+54 9 11 1234-5678",t:3,u:"19 may"},{n:"Sofía Martínez",c:"+54 9 11 8765-4321",t:5,u:"21 may"},
    {n:"Ana Rodríguez",c:"+54 9 11 5555-1234",t:1,u:"16 may"},{n:"Laura Fernández",c:"+54 9 11 9999-0000",t:2,u:"14 may"},
    {n:"Carla Ruiz",c:"+54 9 11 3333-7777",t:4,u:"15 may"},
  ];
  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}><div style={{...S.hAccent}}/><div style={{ position:"relative", zIndex:1 }}><h1 style={{...S.hTitle}}>Pacientes</h1><p style={{...S.hSub}}>{pacs.length} registradas</p></div></div>
      <div style={{ padding:20 }}>
        {pacs.map((p,i)=>(
          <div key={i} style={{...S.card, display:"flex", alignItems:"center", gap:14}}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:"#E8D5C8", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><span style={{ fontSize:18, color:"#2C2420", fontWeight:600 }}>{p.n[0]}</span></div>
            <div style={{ flex:1 }}><p style={{ fontSize:15, color:"#2C2420", margin:"0 0 2px", fontWeight:600 }}>{p.n}</p><p style={{ fontSize:12, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif" }}>{p.c}</p></div>
            <div style={{ textAlign:"right" }}><p style={{ fontSize:14, color:"#2C2420", margin:"0 0 2px", fontFamily:"'Raleway',sans-serif", fontWeight:700 }}>{p.t}</p><p style={{ fontSize:10, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif", textTransform:"uppercase" }}>{p.u}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [rol, setRol] = useState(null);
  const [tabP, setTabP] = useState("disponibles");
  const [tabA, setTabA] = useState("turnos");

  if(!rol) return <Login onLogin={setRol}/>;

  if(rol==="paciente") return (
    <div style={{...S.app}}>
      <Fonts/>
      {tabP==="disponibles" && <TurnosDisponibles/>}
      {tabP==="misturnos"   && <MisTurnos/>}
      <nav style={{...S.nav}}>
        {[{id:"disponibles",ic:"cal",lb:"Reservar"},{id:"misturnos",ic:"usr",lb:"Mis turnos"}].map(n=>(
          <button key={n.id} style={{...nb(tabP===n.id)}} onClick={()=>setTabP(n.id)}><Ico n={n.ic} size={22} color={tabP===n.id?"#8FAF8A":"#A89890"}/>{n.lb}</button>
        ))}
      </nav>
    </div>
  );

  return (
    <div style={{...S.app}}>
      <Fonts/>
      {tabA==="turnos"        && <AdminTurnos/>}
      {tabA==="disponibilidad"&& <AdminDisponibilidad/>}
      {tabA==="pacientes"     && <AdminPacientes/>}
      <nav style={{...S.nav}}>
        {[{id:"turnos",ic:"home",lb:"Turnos"},{id:"disponibilidad",ic:"cal",lb:"Disponibilidad"},{id:"pacientes",ic:"usrs",lb:"Pacientes"}].map(n=>(
          <button key={n.id} style={{...nb(tabA===n.id)}} onClick={()=>setTabA(n.id)}><Ico n={n.ic} size={22} color={tabA===n.id?"#8FAF8A":"#A89890"}/>{n.lb}</button>
        ))}
      </nav>
    </div>
  );
}
"cal",lb:"Reservar"},{id:"misturnos",ic:"usr",lb:"Mis turnos"}].map(n=>(
          <button key={n.id} style={{...nb(tabP===n.id)}} onClick={()=>setTabP(n.id)}><Ico n={n.ic} size={22} color={tabP===n.id?"#8FAF8A":"#A89890"}/>{n.lb}</button>
        ))}
      </nav>
    </div>
  );

  return (
    <div style={{...S.app}}>
      <Fonts/>
      {tabA==="turnos"        && <AdminTurnos/>}
      {tabA==="disponibilidad"&& <AdminDisponibilidad/>}
      {tabA==="pacientes"     && <AdminPacientes/>}
      <nav style={{...S.nav}}>
        {[{id:"turnos",ic:"home",lb:"Turnos"},{id:"disponibilidad",ic:"cal",lb:"Disponibilidad"},{id:"pacientes",ic:"usrs",lb:"Pacientes"}].map(n=>(
          <button key={n.id} style={{...nb(tabA===n.id)}} onClick={()=>setTabA(n.id)}><Ico n={n.ic} size={22} color={tabA===n.id?"#8FAF8A":"#A89890"}/>{n.lb}</button>
        ))}
      </nav>
    </div>
  );
}
