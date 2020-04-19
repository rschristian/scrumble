package com.nsa.bt.scrumble.security.oauth;

import com.nsa.bt.scrumble.exception.OAuth2AuthenticationError;
import com.nsa.bt.scrumble.security.oauth.users.GitLabOAuth2UserInfo;
import com.nsa.bt.scrumble.security.oauth.users.OAuth2UserInfo;

import java.util.Map;

public final class OAuth2UserInfoFactory {
    private OAuth2UserInfoFactory() {
    }

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase("gitlab")) {
            return new GitLabOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationError("Login with " + registrationId + " is not supported yet.");
        }
    }
}
