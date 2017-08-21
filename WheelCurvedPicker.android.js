'use strict';

import React from 'react';
import {
	View,
	ColorPropType,
	requireNativeComponent,
} from 'react-native';


class WheelCurvedPicker extends React.Component {
    static propTypes = {
		...View.propTypes,

		data: React.PropTypes.array,

		textColor: ColorPropType,

		textSize: React.PropTypes.number,

		itemStyle: React.PropTypes.object,

		itemSpace: React.PropTypes.number,

		onValueChange: React.PropTypes.func,

		selectedValue: React.PropTypes.any,

		selectedIndex: React.PropTypes.number,
	};

    static defaultProps = {
        itemStyle : {color:"white", fontSize:26},
        itemSpace: 20,
    };

    componentWillReceiveProps(nextProps) {
		this.setState(this._stateFromProps(nextProps));
	}

    _stateFromProps = (props) => {
		var selectedIndex = 0;
		var items = [];
		React.Children.forEach(props.children, function (child, index) {
			if (child.props.value === props.selectedValue) {
				selectedIndex = index;
			}
			items.push({value: child.props.value, label: child.props.label});
		});

		var textSize = props.itemStyle.fontSize
		var textColor = props.itemStyle.color

		return {selectedIndex, items, textSize, textColor};
	};

    _onValueChange = (e: Event) => {
		if (this.props.onValueChange) {
			this.props.onValueChange(e.nativeEvent.data);
		}
	};


    constructor(props) {
    	super(props)
        this.state = this._stateFromProps(props);
    }

    render() {
		return <WheelCurvedPickerNative
				{...this.props}
				onValueChange={this._onValueChange}
				data={this.state.items}
				textColor={this.state.textColor}
				textSize={this.state.textSize}
				selectedIndex={parseInt(this.state.selectedIndex)} />;
	}
}

WheelCurvedPicker.Item = class extends React.Component {
    static propTypes = {
		value: React.PropTypes.any, // string or integer basically
		label: React.PropTypes.string,
	};

    render() {
		// These items don't get rendered directly.
		return null;
	}
};

var WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPicker);

module.exports = WheelCurvedPicker;
