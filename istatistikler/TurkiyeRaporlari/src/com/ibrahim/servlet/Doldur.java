package com.ibrahim.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.ibrahim.model.BasicPopulationObject;
import com.ibrahim.mongoDB.MUtil;
import com.mongodb.DBObject;

/**
 * Servlet implementation class Doldur
 */
@WebServlet("/Doldur")
public class Doldur extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Doldur() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String op = request.getParameter("op");

		switch (op) {
		case "bilgigetir":
			String sehir = request.getParameter("sehir");
			bilgiGetir(response, sehir);
			break;
		case "sehirdoldur":
			getdata(response);
			break;
		default:
			break;
		}

	}

	private void bilgiGetir(HttpServletResponse response, String sehir)
			throws IOException {
		List<BasicPopulationObject> list = new ArrayList<>();
		MUtil db = new MUtil();
		Map<String, Object> map = new HashMap<String, Object>();
		list = db.getData(sehir);
		map.put("data", list);
		write(response, map);

	}

	private void getdata(HttpServletResponse response) throws IOException {
		List<DBObject> list = new ArrayList<DBObject>();
		MUtil db = new MUtil();
		Map<String, Object> map = new HashMap<String, Object>();
		list = db.getsehirisimleri();
		map.put("data", list);
		write(response, map);
	}

	private void write(HttpServletResponse response, Map<String, Object> map)
			throws IOException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(new Gson().toJson(map));
	}

}
