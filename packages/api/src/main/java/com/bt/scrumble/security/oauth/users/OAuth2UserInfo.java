package com.bt.scrumble.security.oauth.users;

import java.util.Map;

public abstract class OAuth2UserInfo {
    private final Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract int getId();

    public abstract String getName();

    public abstract String getUsername();
}
