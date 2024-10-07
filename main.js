import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'

import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDdr0fxnYpfeG2b6GlTQ_-4TqpmGk2uvOk",
  authDomain: "insan-cemerlang-80713.firebaseapp.com",
  projectId: "insan-cemerlang-80713",
  storageBucket: "insan-cemerlang-80713.appspot.com",
  messagingSenderId: "1016858047753",
  appId: "1:1016858047753:web:0534dda2085c2adab68fd8",
  measurementId: "G-E7G0K9XTCD"
};

//inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function ambilDaftarSiswa() {
  const refDokumen = collection(basisdata, "siswa");
  const kueri = query(refDokumen, orderBy("Nama"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      Nama: dokumen.data().Nama,
      Alamat: dokumen.data().Alamat
    })
  })
  
  return hasilKueri;
}

export async function tambahSiswa(Nama, Alamat) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "siswa"), {
    Nama: Nama, 
    Alamat: Alamat
    })
    
    // menampilkan pesan berhasil
    console.log('berhasil menyimpan data siswa')
  } catch (error) {
    // menampilkan pesan gagal 
    console.log('gagal menyimpan data siswa')
  }
}
export async function hapusSiswa(id) {
  await deleteDoc(doc(basisdata, "siswa", id))
}