package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.config.AppProperties;
import com.nsa.bt.scrumble.services.ITokenService;
import org.springframework.stereotype.Service;

@Service
public class TokenService implements ITokenService {

    private AppProperties appProperties;

    public TokenService(AppProperties appProperties) {
        this.appProperties = appProperties;
    }


    @Override
    public long timeLongLifeTokenValidFor() {
        return appProperties.getAuth().getLongLifeTokenExpirationMsec();
    }

    @Override
    public long timeShortLifeTokenValidFor() {
        return appProperties.getAuth().getShortLifeTokenExpirationMsec();
    }
}
