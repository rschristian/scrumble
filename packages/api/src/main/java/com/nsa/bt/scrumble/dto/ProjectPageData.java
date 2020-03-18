package com.nsa.bt.scrumble.dto;

public class ProjectPageData {
    private int projectId;
    private int numberOfIssues;
    private int numberOfPages;
    private int firstPageSize;
    private int lastPageSize;

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public int getNumberOfIssues() {
        return numberOfIssues;
    }

    public void setNumberOfIssues(int numberOfIssues) {
        this.numberOfIssues = numberOfIssues;
    }

    public int getNumberOfPages() {
        return numberOfPages;
    }

    public void setNumberOfPages(int numberOfPages) {
        this.numberOfPages = numberOfPages;
    }

    public int getFirstPageSize() {
        return firstPageSize;
    }

    public void setFirstPageSize(int firstPageSize) {
        this.firstPageSize = firstPageSize;
    }

    public int getLastPageSize() {
        return lastPageSize;
    }

    public void setLastPageSize(int lastPageSize) {
        this.lastPageSize = lastPageSize;
    }

    public String toString() {
        return String.format("Project ID: %d\nNumber of issues: %d\nNumber of pages: %d\nFirst page size: %d\nLast page size: %d",
                this.getProjectId(), this.getNumberOfIssues(), this.getNumberOfPages(), this.firstPageSize, this.getLastPageSize());
    }
}
