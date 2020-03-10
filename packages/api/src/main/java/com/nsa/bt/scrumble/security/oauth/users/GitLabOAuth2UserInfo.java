package com.nsa.bt.scrumble.security.oauth.users;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import java.util.List;
import java.util.Map;

public class GitLabOAuth2UserInfo extends OAuth2UserInfo {
    private List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_USER");

    public GitLabOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public int getId() {
        return Integer.parseInt((String) this.attributes.get("sub"));
    }

    @Override
    public String getName() {
        return (String) this.attributes.get("name");
    }

    @Override
    public String getUsername() {
        return (String) this.attributes.get("nickname");
    }
}
