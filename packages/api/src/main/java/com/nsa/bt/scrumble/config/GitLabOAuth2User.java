package com.nsa.bt.scrumble.config;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This class is given to the configure() method in SecurityConfig.java so that when a use authenticates with GitLab,
 * user details returned from the configured user-info endpoint can be mapped into a Principal object.
 * This allows us to autowire Authentication objects in controllers and have access to a users "nickname" or username
 * (returned by GitLab as "nickname"), as well as their full name and picture URL.
 *
 * E.g.  GitLabOAuth2User user = (GitLabOAuth2User) authentication.getPrincipal();
 */
public class GitLabOAuth2User implements OAuth2User {

    private List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_USER");
    private Map<String, Object> attributes;
    private String id;
    private String name;
    private String nickname;
    private String picture;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public Map<String, Object> getAttributes() {
        if (this.attributes == null) {
            this.attributes = new HashMap<>();
            this.attributes.put("id", this.getId());
            this.attributes.put("name", this.getName());
            this.attributes.put("picture", this.getPicture());
            this.attributes.put("nickname", this.getNickname());
        }
        return attributes;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return this.picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getNickname() {
        return this.nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}