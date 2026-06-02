import Toolbar from "@/shared/components/Toolbar/Toolbar";
import {Widget} from "@/shared/components/Widget/Widget";
import {useEffect, useState} from "react";
import Tabs from "@/shared/components/Toolbar/components/Tabs/Tabs";
import {TABS, type TabsType} from "@/shared/consts/tabs";
import ProfileTab from "@/modules/settings/components/ProfileTab/ProfileTab";
import {getApplicationUser} from "@/modules/user";
import SecurityTab from "@/modules/settings/components/SecurityTab/SecurityTab";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/shared/hooks/useAppSelector.ts";

const Settings = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);

    const [currentTab, setCurrentTab] = useState<TabsType>(TABS.PROFILE);

    let content;

    switch (currentTab) {
        case TABS.PROFILE: {
            content = <ProfileTab
                firstName={user?.firstName ?? ""}
                lastName={user?.lastName ?? ""}
                avatarUri={user?.avatarUri}/>
            break;
        }
        case TABS.SECURITY: {
            content = <SecurityTab/>;
            break;
        }
        // case TABS.PREFERENCES: {
        //     content = "Preferences";
        //     break;
        // }
        default: {
            content = "Empty";
        }
    }

    useEffect(() => {
        if (!user)
            dispatch(getApplicationUser());
    }, [user]);

    const onChangeTab = (newTab: TabsType) => {
        setCurrentTab(newTab);
    }

    return (
        <div className="container content__container">
            <Toolbar>
                <Tabs
                    tabs={Object.values(TABS)}
                    currentTab={currentTab}
                    onChangeTab={onChangeTab}/>
            </Toolbar>

            <Widget>
                <Widget.Content>
                    {content}
                </Widget.Content>
            </Widget>
        </div>
    );
}

export default Settings;