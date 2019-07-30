import React from 'react';
import IconBadge from 'react-native-icon-badge';
import {View, Text} from 'react-native';

class Badge extends React.Component {

    state = {
        BadgeCount: 3
    }
    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <IconBadge
                    MainElement={
                        <View style={{
                            backgroundColor: '#489EFE',
                            width: 50,
                            height: 50,
                            margin: 6
                        }} />
                    }
                    BadgeElement={
                        <Text style={{ color: '#FFFFFF' }}>{this.state.BadgeCount}</Text>
                    }
                    IconBadgeStyle={
                        {
                            width: 30,
                            height: 30,
                            backgroundColor: '#FF00EE'
                        }
                    }
                    Hidden={this.state.BadgeCount == 0}
                />
            </View>
        );
    }
}

export default Badge;
