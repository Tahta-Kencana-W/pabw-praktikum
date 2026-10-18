const URL_NEGARA = "https://countriesnow.space/api/v0.1/countries/info?returns=capital,flag";
const URL_POPULASI_IBUKOTA = "https://countriesnow.space/api/v0.1/countries/population/cities/q?city=";

let permintaanNegara;
const cachePopulasi = new Map();

function normalisasi(teks = "") {
  return teks
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("id-ID");
}

async function ambilJson(url, namaLayanan) {
  let response;

  try {
    response = await fetch(url, {
      headers: { Accept: "application/json" }
    });
  } catch {
    throw new Error(`Tidak dapat menghubungi layanan ${namaLayanan}. Periksa koneksi internet.`);
  }

  if (!response.ok) {
    throw new Error(`Layanan ${namaLayanan} gagal (HTTP ${response.status}).`);
  }

  let hasil;
  try {
    hasil = await response.json();
  } catch {
    throw new Error(`Respons layanan ${namaLayanan} bukan JSON yang valid.`);
  }

  return hasil;
}

function dataNegara() {
  if (!permintaanNegara) {
    permintaanNegara = ambilJson(URL_NEGARA, "negara")
      .then((hasil) => {
        if (hasil.error || !Array.isArray(hasil.data)) {
          throw new Error("Format data negara dari layanan tidak valid.");
        }
        return hasil.data;
      })
      .catch((error) => {
        permintaanNegara = undefined;
        throw error;
      });
  }

  return permintaanNegara;
}

function populasiIbuKota(negara, ibuKota) {
  if (!ibuKota) {
    return Promise.resolve({ population: null, populationYear: null });
  }

  const cacheKey = `${normalisasi(negara)}|${normalisasi(ibuKota)}`;
  if (!cachePopulasi.has(cacheKey)) {
    const url = `${URL_POPULASI_IBUKOTA}${encodeURIComponent(ibuKota)}`;
    const permintaan = ambilJson(url, "populasi ibu kota")
      .then((hasil) => {
        if (hasil.error || !hasil.data) {
          return { population: null, populationYear: null };
        }

        const records = Array.isArray(hasil.data) ? hasil.data : [hasil.data];
        const counts = records
          .filter((item) =>
            normalisasi(item.country) === normalisasi(negara)
            && normalisasi(item.city) === normalisasi(ibuKota)
          )
          .flatMap((item) => item.populationCounts || [])
          .map((item) => ({ year: Number(item.year), value: Number(item.value) }))
          .filter((item) => Number.isFinite(item.year) && Number.isFinite(item.value));

        if (counts.length === 0) {
          return { population: null, populationYear: null };
        }

        const populationYear = Math.max(...counts.map((item) => item.year));
        const population = Math.max(
          ...counts.filter((item) => item.year === populationYear).map((item) => item.value)
        );

        return { population, populationYear };
      })
      .catch((error) => {
        cachePopulasi.delete(cacheKey);
        throw error;
      });
    cachePopulasi.set(cacheKey, permintaan);
  }

  return cachePopulasi.get(cacheKey);
}

function ubahFormatNegara(negara, populasi) {
  return {
    names: { common: negara.name },
    capitals: negara.capital ? [{ name: negara.capital }] : [],
    population: populasi.population,
    populationYear: populasi.populationYear,
    populationError: populasi.error || "",
    flag: {
      url_png: negara.flag || "",
      description: `Bendera ${negara.name}`
    }
  };
}

export async function ambilSemuaNegara() {
  const negara = await dataNegara();
  return negara.map((item) => ubahFormatNegara(item, {
    population: null,
    populationYear: null
  }));
}

export async function cariNegara(nama) {
  const pencarian = normalisasi(nama);
  if (!pencarian) return [];

  const negara = await dataNegara();
  const cocok = negara
    .filter((item) => normalisasi(item.name).includes(pencarian))
    .sort((a, b) => {
      const aStartsWith = normalisasi(a.name).startsWith(pencarian);
      const bStartsWith = normalisasi(b.name).startsWith(pencarian);
      return Number(bStartsWith) - Number(aStartsWith)
        || a.name.localeCompare(b.name, "id");
    })
    .slice(0, 20);

  return Promise.all(cocok.map(async (item) => {
    try {
      const populasi = await populasiIbuKota(item.name, item.capital || "");
      return ubahFormatNegara(item, populasi);
    } catch (error) {
      return ubahFormatNegara(item, {
        population: null,
        populationYear: null,
        error: error instanceof Error ? error.message : "Terjadi kesalahan."
      });
    }
  }));
}
