const games = [
 {id:"ml",name:"Mobile Legends",short:"MLBB",icon:"💎",sub:"Diamond",bg:"linear-gradient(135deg,#3c77dd,#9ce4ff)",currency:"Diamond",packs:[["86 Diamond","86 Diamond",20000],["172 Diamond","172 Diamond",39000],["257 Diamond","257 Diamond",58000],["344 Diamond","344 Diamond",77000],["514 Diamond","514 Diamond",114000],["706 Diamond","706 Diamond",155000]]},
 {id:"pubg",name:"PUBG Mobile",short:"PUBG",icon:"🎯",sub:"Unknown Cash",bg:"linear-gradient(135deg,#d78b32,#ffe6a5)",currency:"UC",packs:[["60 UC","60 UC",15000],["325 UC","325 UC",74000],["660 UC","660 UC",145000],["1800 UC","1800 UC",365000],["3850 UC","3850 UC",730000]]},
 {id:"ff",name:"Free Fire",short:"FREE FIRE",icon:"🔥",sub:"Diamond",bg:"linear-gradient(135deg,#f15b3b,#ffbf68)",currency:"Diamond",packs:[["70 Diamond","70 Diamond",10000],["140 Diamond","140 Diamond",20000],["355 Diamond","355 Diamond",50000],["720 Diamond","720 Diamond",99000],["1450 Diamond","1450 Diamond",199000]]},
 {id:"genshin",name:"Genshin Impact",short:"GENSHIN",icon:"✨",sub:"Genesis Crystal",bg:"linear-gradient(135deg,#4b6fc5,#c8d9ff)",currency:"Genesis Crystal",packs:[["60 Crystal","60 Crystal",16000],["300 + 30","300 + 30 Crystal",79000],["980 + 110","980 + 110 Crystal",249000],["1980 + 260","1980 + 260 Crystal",479000]]},
 {id:"hok",name:"Honor of Kings",short:"HOK",icon:"⚔️",sub:"Token",bg:"linear-gradient(135deg,#7c4b31,#e9bd77)",currency:"Token",packs:[["80 Token","80 Token",15000],["240 Token","240 Token",45000],["400 Token","400 Token",75000],["800 Token","800 Token",149000]]},
 {id:"roblox",name:"Roblox",short:"ROBLOX",icon:"🟥",sub:"Robux",bg:"linear-gradient(135deg,#4d5668,#b8c5d8)",currency:"Robux",packs:[["80 Robux","80 Robux",16000],["400 Robux","400 Robux",79000],["800 Robux","800 Robux",159000],["1700 Robux","1700 Robux",319000]]},
 {id:"valorant",name:"Valorant",short:"VALORANT",icon:"🎮",sub:"Points",bg:"linear-gradient(135deg,#c33f5b,#ffa2ae)",currency:"VP",packs:[["125 VP","125 VP",15000],["420 VP","420 VP",50000],["700 VP","700 VP",80000],["1375 VP","1375 VP",150000]]},
 {id:"codm",name:"Call of Duty Mobile",short:"CODM",icon:"💥",sub:"CP",bg:"linear-gradient(135deg,#343c47,#9ba7b5)",currency:"CP",packs:[["31 CP","31 CP",5000],["62 CP","62 CP",10000],["127 CP","127 CP",20000],["320 CP","320 CP",49000]]}
];
let currentUser = null, cart = [], activeGame = null, toastTimer;
const $ = id => document.getElementById(id);
const rupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
function showToast(msg){$("toast").textContent=msg;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2800)}
function openModal(id){$(id).classList.remove("hidden");document.body.style.overflow="hidden"}
function closeModal(id){$(id).classList.add("hidden");if(!document.querySelector(".modal-backdrop:not(.hidden)"))document.body.style.overflow=""}
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
document.querySelectorAll(".modal-backdrop").forEach(bg=>bg.addEventListener("click",e=>{if(e.target===bg && bg.id!=="loadingModal")closeModal(bg.id)}));
function renderGames(filter=""){
 const list=games.filter(g=>(g.name+" "+g.sub).toLowerCase().includes(filter.toLowerCase()));
 $("gameGrid").innerHTML=list.map(g=>`<article class="game-card" data-game="${g.id}" tabindex="0" role="button" aria-label="Pilih ${g.name}"><div class="game-art" style="background:${g.bg}"><span>${g.icon}</span></div><h3>${g.name}</h3><p>${g.sub} · Paket tersedia</p><div class="game-foot"><small>Mulai ${rupiah(Math.min(...g.packs.map(p=>p[2])))}</small><button class="add-game" aria-label="Pilih ${g.name}">+</button></div></article>`).join("") || '<p>Game tidak ditemukan. Coba kata kunci lain.</p>';
 document.querySelectorAll("[data-game]").forEach(el=>{const fn=()=>selectGame(el.dataset.game);el.addEventListener("click",fn);el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();fn()}})});
}
function updateCartCount(){$("cartCount").textContent=cart.length}
function selectGame(id){
 if(!currentUser){showToast("Login dulu untuk memilih paket game.");openModal("loginModal");return}
 activeGame=games.find(g=>g.id===id);
 $("packageContent").innerHTML=`<div class="package-top"><div class="package-icon" style="background:${activeGame.bg}">${activeGame.icon}</div><div><div class="eyebrow purple">PILIH PAKET</div><h2 id="packageTitle">${activeGame.name}</h2><p>Pilih jumlah ${activeGame.currency} yang kamu butuhkan.</p></div></div><div class="pack-grid">${activeGame.packs.map((p,i)=>`<button class="pack-card" data-pack="${i}"><b>${p[0]}</b><span>${p[1]}</span><strong>${rupiah(p[2])}</strong><span class="pack-add">+</span></button>`).join("")}</div><p class="form-note">Harga hanya contoh untuk demonstrasi UI, bukan penawaran top up aktual.</p>`;
 document.querySelectorAll("[data-pack]").forEach(b=>b.addEventListener("click",()=>addToCart(activeGame,b.dataset.pack)));
 openModal("packageModal");
}
function addToCart(game,packIndex){
 const pack=game.packs[Number(packIndex)];
 cart.push({key:Date.now()+"-"+Math.random().toString(16).slice(2),gameId:game.id,game:game.name,icon:game.icon,pack:pack[1],price:pack[2]});
 updateCartCount();closeModal("packageModal");showToast(`${pack[1]} ${game.name} ditambahkan ke keranjang.`);
 if(cart.length>=3)$("mascotFace").textContent="O_o";
}
function openCheckout(){
 if(!currentUser){openModal("loginModal");showToast("Login dulu sebelum checkout.");return}
 if(!cart.length){showToast("Keranjang masih kosong. Pilih paket game dulu.");return}
 $("checkoutItems").innerHTML=cart.map((item,i)=>`<div class="checkout-line"><div><h3>${item.icon} ${item.game}</h3><p>${item.pack} · ${rupiah(item.price)}</p></div><div><label for="player-${i}">ID Pemain / User ID</label><input class="player-input" id="player-${i}" type="text" required maxlength="40" placeholder="Masukkan ID pemain" autocomplete="off"><button type="button" class="remove-item" data-remove="${i}" style="border:0;background:none;color:#d84d77;font-size:10px;font-weight:900;padding:8px 0;cursor:pointer">Hapus item</button></div></div>`).join("");
 $("checkoutTotal").textContent=rupiah(cart.reduce((s,x)=>s+x.price,0));
 document.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{cart.splice(Number(b.dataset.remove),1);updateCartCount();if(!cart.length){closeModal("checkoutModal");showToast("Keranjang kosong.");return}openCheckout()}));
 openModal("checkoutModal");
}
$("openLogin").addEventListener("click",()=>currentUser?showToast("Kamu sudah masuk sebagai "+currentUser):openModal("loginModal"));
$("loginForm").addEventListener("submit",e=>{
 e.preventDefault();const email=$("email").value.trim(),pass=$("password").value;
 if(!email||pass.length<6){showToast("Isi email dan password minimal 6 karakter.");return}
 currentUser=email;const short=email.split("@")[0];
 $("userPill").textContent="👤 "+short;$("userPill").classList.remove("hidden");$("openLogin").classList.add("hidden");closeModal("loginModal");showToast("Login demo berhasil. Hai, "+short+"!");$("mascotFace").textContent="(^_^)";
});
$("checkoutForm").addEventListener("submit",e=>{
 e.preventDefault();
 if(!cart.length){closeModal("checkoutModal");return}
 const payment=new FormData(e.target).get("payment");
 if(!payment){showToast("Pilih metode pembayaran.");return}
 const playerIds=cart.map((_,i)=>$("player-"+i).value.trim());
 if(playerIds.some(x=>!x)){showToast("Lengkapi ID pemain untuk setiap item.");return}
 const receiptData={items:cart.map((item,i)=>({...item,playerId:playerIds[i]})),payment,total:cart.reduce((s,x)=>s+x.price,0),user:currentUser};
 closeModal("checkoutModal");openModal("loadingModal");$("loadingTitle").textContent="Menyiapkan transaksi...";$("loadingText").textContent="Mochi sedang mengecek pesananmu.";
 setTimeout(()=>{$("loadingTitle").textContent="Menyelesaikan simulasi...";$("loadingText").textContent="Sebentar lagi, player!";},1000);
 setTimeout(()=>{
 closeModal("loadingModal");
 const id="UP-"+Math.random().toString(36).slice(2,8).toUpperCase();
 $("receipt").innerHTML=`<div>Nomor demo: <strong>${id}</strong></div><div>Akun: ${escapeHtml(receiptData.user)}</div><div>Metode: <strong>${escapeHtml(payment)}</strong></div><div style="margin-top:8px;border-top:1px dashed #ded5f3;padding-top:8px">${receiptData.items.map(it=>`<div>${it.icon} ${escapeHtml(it.game)} — ${escapeHtml(it.pack)}<br><span style="color:#8c849c">ID: ${escapeHtml(it.playerId)} · ${rupiah(it.price)}</span></div>`).join("<hr style='border:0;border-top:1px solid #eee8f6;margin:8px 0'>")}</div><div style="margin-top:8px;font-size:13px">Total demo: <strong>${rupiah(receiptData.total)}</strong></div><div style="color:#b04d78;margin-top:8px">Status: SIMULASI BERHASIL</div>`;
 cart=[];updateCartCount();$("mascotFace").textContent="(*_*)";openModal("successModal");
 },2500);
});
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("cartJump").addEventListener("click",openCheckout);
$("bottomShop").addEventListener("click",()=>$("games").scrollIntoView({behavior:"smooth"}));
$("finishBtn").addEventListener("click",()=>{closeModal("successModal");$("mascotFace").textContent="^_^";});
$("gameSearch").addEventListener("input",e=>renderGames(e.target.value));
renderGames();
