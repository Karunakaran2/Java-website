package com.karan.backend.conflogin.dto;

public class Pagination {
	private String pageStatus = "F";
	private String pageSearch = "";
	private String pageSort = "D";
	private long id = 0;
	
	private int pageNumber = 1;
	private int pageFirst = 0;
	private int pageSize = 25;
	private long pageTotal = 0;
	private int pageCount = 0;
	private int currentPageSize = 0;
	
	public static Pagination updatePaginationAttributes(Pagination pagination) {
		PageStatusConstants pageStatusConstants 
			= PageStatusConstants.valueOf(pagination.getPageStatus());
		
		if (pagination.getPageTotal() < pagination.getPageSize()) {
			pagination.setPageCount(1);
		} else {
			pagination.setPageCount((int) pagination.getPageTotal() / pagination.getPageSize());
			if ((pagination.getPageTotal() % pagination.getPageSize()) > 0) {
				pagination.setPageCount(pagination.getPageCount() + 1);
			}
		}

		switch (pageStatusConstants) {
			case P:
				pagination.setPageNumber(pagination.getPageNumber() - 1);
				pagination.setPageFirst((pagination.getPageNumber() - 1) * pagination.getPageSize());
				pagination.setPageStatus("P");
				break;
	
			case N:
				pagination.setPageNumber(pagination.getPageNumber() + 1);
				pagination.setPageFirst((pagination.getPageNumber() - 1) * pagination.getPageSize());
				pagination.setPageStatus("N");
				break;
	
			case L:
				pagination.setPageNumber(pagination.getPageCount());
				pagination.setPageFirst((pagination.getPageNumber() - 1) * pagination.getPageSize());
				pagination.setPageStatus("L");
				break;
	
			case PP:
				pagination.setPageNumber(pagination.getPageNumber());
				pagination.setPageFirst((pagination.getPageNumber() - 1) * pagination.getPageSize());
				pagination.setPageStatus("PP");
				break;
	
			case fsearch:
				pagination.setPageNumber(1);
				pagination.setPageFirst(0);
				pagination.setPageStatus("F");
				break;
	
			case F:
				pagination.setPageNumber(1);
				pagination.setPageFirst(0);
				pagination.setPageStatus("F");
				break;
	
			case fsave:
				pagination.setPageFirst((pagination.getPageNumber() - 1) * pagination.getPageSize());
				pagination.setPageStatus("F");
				break;
	
			default:
				throw new IllegalArgumentException("Choice Not Found");
		}

		return pagination;
	}

	public static Pagination updatePaginationAttributesForSave(Pagination pagination) {
		if (pagination.getPageStatus().equals("P"))
			pagination.setPageNumber(pagination.getPageNumber() + 1);
		if (pagination.getPageStatus().equals("N"))
			pagination.setPageNumber(pagination.getPageNumber() - 1);
		return pagination;
	}

	public enum PageStatusConstants {
		P, N, L, F, PP, fsearch, fsave
	}

	public String getPageStatus() {
		return pageStatus;
	}

	public void setPageStatus(String pageStatus) {
		this.pageStatus = pageStatus;
	}

	public String getPageSearch() {
		return pageSearch;
	}

	public void setPageSearch(String pageSearch) {
		this.pageSearch = pageSearch;
	}

	public String getPageSort() {
		return pageSort;
	}

	public void setPageSort(String pageSort) {
		this.pageSort = pageSort;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public int getPageFirst() {
		return pageFirst;
	}

	public void setPageFirst(int pageFirst) {
		this.pageFirst = pageFirst;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public long getPageTotal() {
		return pageTotal;
	}

	public void setPageTotal(long pageTotal) {
		this.pageTotal = pageTotal;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public int getCurrentPageSize() {
		return currentPageSize;
	}

	public void setCurrentPageSize(int currentPageSize) {
		this.currentPageSize = currentPageSize;
	}
	
	

}