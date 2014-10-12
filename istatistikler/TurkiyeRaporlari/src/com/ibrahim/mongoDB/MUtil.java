package com.ibrahim.mongoDB;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.ibrahim.model.BasicPopulationObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

public class MUtil {

	private MongoClient mongoclient;
	private DB db;

	public MUtil() throws UnknownHostException {
		this.mongoclient = new MongoClient("localhost", 27017);
		this.db = mongoclient.getDB("bulk");
	}

	public MUtil(String dbname) throws UnknownHostException {
		this.mongoclient = new MongoClient("localhost", 27017);
		this.db = mongoclient.getDB(dbname);
	}

	public MUtil(String dbname, String host, int port)
			throws UnknownHostException {
		this.mongoclient = new MongoClient(host, port);
		this.db = mongoclient.getDB(dbname);
	}

	public Set<String> getCollectionNames() {
		Set<String> colls = null;
		colls = db.getCollectionNames();
		return colls;
	}

	public void insertMap(Map map, String collectionName) {
		DBCollection coll = db.getCollection(collectionName);
		coll.insert(new BasicDBObject(map));
	}

	public List<DBObject> getData() {
		List<DBObject> list = new ArrayList<>();

		DBCollection coll = db.getCollection("nufus2013");
		BasicDBObject allQuery = new BasicDBObject();
		BasicDBObject fields = new BasicDBObject();
		fields.put("_id", 0);

		DBCursor cursor = coll.find(allQuery, fields);
		list = cursor.toArray();
		return list;
	}

	// TODO Düzeltilecek
	public List<BasicPopulationObject> getData(String id) {
		List<BasicPopulationObject> list = new ArrayList<>();

		DBCollection coll = db.getCollection("nufus2013");

		BasicDBObject field = new BasicDBObject();
		field.put("_id", 0);
		BasicDBObject query = new BasicDBObject().append("isim", id);

		DBCursor cursor = coll.find(query, field);
		while (cursor.hasNext()) {
			DBObject dbobj = cursor.next();
			BasicDBObject basicdbobj = (BasicDBObject) dbobj;
			String erkek = basicdbobj.getString("erkek");
			String kadin = basicdbobj.getString("kadin");
			String toplam = basicdbobj.getString("toplam");
			String isim = basicdbobj.getString("isim");

			BasicPopulationObject popobj = new BasicPopulationObject();
			popobj.setErkek(erkek);
			popobj.setKadýn(kadin);
			popobj.setToplam(toplam);
			popobj.setIlAdi(isim);
			list.add(popobj);
		}
		return list;
	}

	public List<DBObject> getsehirisimleri() {
		List<DBObject> list = new ArrayList<DBObject>();
		DBCollection coll = db.getCollection("nufus2013");

		BasicDBObject allQuery = new BasicDBObject();
		BasicDBObject fields = new BasicDBObject();
		fields.put("_id", 0);
		fields.put("isim", 1);

		DBCursor cursor = coll.find(allQuery, fields);
		list = cursor.toArray();
		return list;
	}

}
