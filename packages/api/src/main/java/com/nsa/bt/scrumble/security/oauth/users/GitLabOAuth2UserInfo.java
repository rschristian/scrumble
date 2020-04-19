package com.nsa.bt.scrumble.security.oauth.users;

import java.util.Map;

public class GitLabOAuth2UserInfo extends OAuth2UserInfo {
    public GitLabOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public int getId() {
        return Integer.parseInt((String) getAttributes().get("sub"));
    }

    @Override
    public String getName() {
        return (String) getAttributes().get("name");
    }

    @Override
    public String getUsername() {
        return (String) getAttributes().get("nickname");
    }
}
