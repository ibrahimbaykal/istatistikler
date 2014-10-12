package com.ibrahim.mongoDB;

import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import au.com.bytecode.opencsv.CSVReader;

public class Nufu2013 {

	public static void main(String[] args) throws IOException {
		// TODO yo bulunamýyor hatasý düzeltilecek
		//String csvFilename = "C:\\User\\admin\\Desktop\\User\\eclipse\\istatistiksitesi\\istatistik\\nuf.csv";
		String csvFilename = "C:\\CSV\\nuf.csv";
		CSVReader csvreader = new CSVReader(new FileReader(csvFilename));
		String[] row = null;
		Map<String , Object> map = null;
		MUtil mutil = new MUtil();
		while((row = csvreader.readNext()) != null) {
			map = new HashMap<String, Object>();
			String metin = row[0];
			String[] satir = metin.split(";");
			if(satir.length == 0)
				continue;
			String isim = satir[0];
			String toplam = satir[1];
			String erkek = satir[2];
			String kadin = satir[3];
			
			map.put("isim", isim);
			map.put("toplam", toplam);
			map.put("erkek", erkek);
			map.put("kadin", kadin);
			mutil.insertMap(map, "nufus2013");
			
		}
	}

}
