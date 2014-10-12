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

/**
 * Servlet implementation class nufus
 */
@WebServlet("/nufus")
public class nufus extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public nufus() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// String op = request.getParameter("op");
		// String yil= request.getParameter("yil");
		String id = request.getParameter("id");
		id = id.substring(0, 1).toUpperCase() + id.substring(1);
		getData(response, id);
	}

	private void getData(HttpServletResponse response, String id)
			throws IOException {
		List<BasicPopulationObject> list = new ArrayList<>();
		MUtil db = new MUtil();
		Map<String, Object> map = new HashMap<String, Object>();
		list = db.getData(id);
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
