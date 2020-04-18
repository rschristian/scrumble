package com.nsa.bt.scrumble.util;

public class GitLabLinks {
    private String first;
    private String last;
    private String next;
    private String prev;

    public GitLabLinks(final String first, final String last, final String next, final String prev) {
        this.first = first;
        this.last = last;
        this.next = next;
        this.prev = prev;
    }

    public GitLabLinks() { }

    public String getFirst() {
        return first;
    }

    public void setFirst(final String first) {
        this.first = first;
    }

    public String getLast() {
        return last;
    }

    public void setLast(final String last) {
        this.last = last;
    }

    public String getNext() {
        return next;
    }

    public void setNext(final String next) {
        this.next = next;
    }

    public String getPrev() {
        return prev;
    }

    public void setPrev(final String prev) {
        this.prev = prev;
    }
}
