package com.nsa.bt.scrumble.dto;

public class IssuePageLink {
    private int scrumblePageNumber;
    private String[] gitlabPageLinks;

    public int getScrumblePageNumber() {
        return scrumblePageNumber;
    }

    public void setScrumblePageNumber(int scrumblePageNumber) {
        this.scrumblePageNumber = scrumblePageNumber;
    }

    public String[] getGitlabPageLinks() {
        return gitlabPageLinks;
    }

    public void setGitlabPageLinks(String[] gitlabPageLinks) {
        this.gitlabPageLinks = gitlabPageLinks;
    }

    public String toString() {
        StringBuilder glLinks = new StringBuilder();
        for(String link: gitlabPageLinks) {
            glLinks.append(link).append(", ");
        }
        return String.format("Scrumble page number: %d\nGitLab links: %s", scrumblePageNumber, glLinks);
    }
}
