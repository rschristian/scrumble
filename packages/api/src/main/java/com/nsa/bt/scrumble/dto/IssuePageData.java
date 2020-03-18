package com.nsa.bt.scrumble.dto;

import java.io.Serializable;

public class IssuePageData implements Serializable {
    private int total;
    private int pageSize;
    private int numberOfPages;

    public IssuePageData() {
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getNumberOfPages() {
        return numberOfPages;
    }

    public void setNumberOfPages(int numberOfPages) {
        this.numberOfPages = numberOfPages;
    }
}
