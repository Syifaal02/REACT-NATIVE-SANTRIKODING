require("dotenv").config();

const prisma = require("./client");

const novel = {
    image: "surat-stasiun-senja.png",
    title: "Surat yang Tertinggal di Stasiun Senja",
    author: "Rania Pramesti",
    synopsis:
        "Setiap Jumat sore, Nara menemukan sepucuk surat tanpa nama di bangku nomor tujuh, stasiun kecil tempat ayahnya dulu bekerja. Surat-surat itu berisi potongan kisah tentang keberanian untuk pulang dan memulai kembali. Saat ia akhirnya membalas, sebuah rahasia keluarga yang lama terdiam perlahan menemukan jalan pulang.",
    chapter: "Bab 1: Bangku Nomor Tujuh",
    totalPages: 8,
    rating: 4.8,
    content: `Hujan baru saja reda ketika Nara tiba di Stasiun Lembayung. Rel-rel basah memantulkan warna jingga dari langit, seperti dua garis yang sedang mengantar matahari pulang. Di tangannya ada sebuah kotak kardus kecil berisi buku-buku milik ayahnya, satu-satunya barang yang belum sanggup ia buka sejak rumah lama mereka dikosongkan.

Kereta terakhir belum datang. Nara memilih bangku nomor tujuh, tempat yang selalu disebut Ayah sebagai tempat terbaik untuk melihat senja. Di bawah dudukan kayunya, terselip amplop krem. Tidak ada nama di bagian depan, hanya tulisan: Untuk siapa pun yang merasa terlambat.

Ia sempat ragu sebelum membukanya. Kertas di dalamnya harum samar seperti lemari tua dan hujan. Isinya pendek, ditulis dengan tinta biru yang mulai pudar.

"Jika suatu hari kau merasa tak punya tempat untuk pulang, ingatlah: rumah bukan selalu alamat. Kadang rumah adalah seseorang yang masih menyisakan kursi untukmu."

Nara membaca kalimat itu dua kali. Entah mengapa, dadanya terasa sesak. Selama tiga tahun terakhir ia selalu menyalahkan dirinya karena tak sempat mengangkat telepon terakhir Ayah. Saat itu ia sedang marah, yakin masih ada hari esok untuk meminta maaf. Hari esok ternyata datang tanpa Ayah di dalamnya.

Dari ruang tunggu, Pak Seno, penjaga stasiun yang rambutnya lebih banyak putih daripada hitam, memperhatikan amplop itu. "Kau menemukannya juga," katanya pelan. Ia tidak bertanya siapa pengirimnya. Seolah bangku itu memang punya kebiasaan menyimpan hal-hal yang belum selesai.

"Siapa yang menulisnya?" tanya Nara.

Pak Seno memandang rel. "Dulu ayahmu sering duduk di sini setelah giliran malam. Ia suka menulis, tapi hampir tak pernah mengirim suratnya."

Nara menatap tulisan di tangannya. Ada huruf "r" yang bentuknya seperti kait kecil, sama persis dengan tulisan pada label kotak kardus di rumah Ayah. Untuk pertama kalinya sejak ia kembali ke kota itu, kesedihannya terasa sedikit berbeda. Bukan lebih ringan, tetapi tidak lagi sendirian.

Kereta melintas jauh di ujung rel, lalu menghilang di tikungan tanpa berhenti. Nara mengeluarkan buku catatan dari tasnya. Pada halaman kosong, ia menulis balasan: "Aku belum tahu cara pulang. Tapi hari ini aku sudah mencoba datang."

Ia melipat kertas itu, memasukkannya ke amplop yang sama, lalu menyelipkannya kembali di bawah bangku nomor tujuh. Besok, mungkin seseorang akan menemukannya. Atau mungkin ia sendiri akan kembali untuk membaca kata-kata itu sekali lagi.

Ketika lampu stasiun menyala satu per satu, Nara mengangkat kotak kardusnya. Di dalamnya masih ada banyak surat yang belum ia baca. Untuk pertama kalinya, ia tidak terburu-buru menutup kotak itu. Malam ini, ia akan membawa semuanya pulang.`,
};

async function seedNovel() {
    const existingNovel = await prisma.post.findFirst({
        where: { title: novel.title },
        select: { id: true },
    });

    if (existingNovel) {
        await prisma.post.update({
            where: { id: existingNovel.id },
            data: novel,
        });
        console.log(`Updated demo novel (ID ${existingNovel.id}).`);
        return;
    }

    const createdNovel = await prisma.post.create({
        data: novel,
        select: { id: true },
    });

    console.log(`Created demo novel (ID ${createdNovel.id}).`);
}

seedNovel()
    .catch((error) => {
        console.error("Failed to seed the demo novel:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
