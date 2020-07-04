import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import Login from 'routes/Auth/Login';
import Success from 'routes/Auth/AuthSuccess';

interface IProps {
    subPage?: SubPage;
}

enum SubPage {
    login = 'login',
    success = 'success',
}

const Auth: FunctionalComponent<IProps> = (props: IProps) => {
    const [subPage, setSubPage] = useState<ComponentChild>(null);

    useEffect(() => {
        switch (props.subPage) {
            case SubPage.success:
                setSubPage(<Success />);
                break;
            default:
                setSubPage(<Login />);
                break;
        }
    }, [props.subPage]);

    return <div class="main-content overflow-hidden">{subPage}</div>;
};

export default Auth;
