package com.ibrahim.mongoDB;

import java.net.UnknownHostException;
import java.util.Set;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;


public class MongoTest {

	public static void main(String[] args) throws UnknownHostException {
		
		MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
		DB db = mongoClient.getDB("bulk");
		DBCollection coll = db.getCollection("ekonomi");
		BasicDBObject allfield = new BasicDBObject();
		BasicDBObject field = new BasicDBObject();
		field.put("_id", 0);
		DBCursor cursor = coll.find(allfield,field);
		for(DBObject item:cursor){
			System.out.println(item);
		}
		
		Set<String> colls = db.getCollectionNames();
		for(String s:colls){
//			System.out.println(s);
		}
//		MUtilTest();
	}
	
	private static void MUtilTest() throws UnknownHostException{
		MUtil mutil = new MUtil("test");
		Set<String> colls = mutil.getCollectionNames();
		for (String s : colls) {
			System.out.println(s);
		}
	}

}
