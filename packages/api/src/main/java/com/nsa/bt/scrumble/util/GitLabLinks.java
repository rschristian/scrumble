package com.nsa.bt.scrumble.util;

public class GitLabLinks {
    private String first;
    private String last;
    private String next;
    private String prev;

    public GitLabLinks(String first, String last, String next, String prev) {
        this.first = first;
        this.last = last;
        this.next = next;
        this.prev = prev;
    }

    public GitLabLinks() {
    }

    public String getFirst() {
        return first;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getLast() {
        return last;
    }

    public void setLast(String last) {
        this.last = last;
    }

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }

    public String getPrev() {
        return prev;
    }

    public void setPrev(String prev) {
        this.prev = prev;
    }
}
