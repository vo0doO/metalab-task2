import { MDCComponent, MDCFoundation } from '@material/base'


class RedblueToggleFoundation extends MDCFoundation {
	constructor ( adapter ) {
		super ( Object.assign ( RedblueToggleFoundation.defaultAdapter, adapter ) )
		this.toggled_ = false
		this.clickHandler_ = () => this.toggle ()
	}
	
	static get defaultAdapter () {
		return {
			getAttr: (/* attr: string */ ) => /* string */ '',
			setAttr: (/* attr: string, value: string */ ) => {},
			addClass: (/* className: string */ ) => {},
			removeClass: (/* className: string */ ) => {},
			setToggleColorTextContent: (/* textContent: string */ ) => {},
			
			registerInteractionHandler:
					(/* type: string, handler: EventListener */ ) => {},
			deregisterInteractionHandler:
					(/* type: string, handler: EventListener */ ) => {}
		}
	}
	
	init () {
		this.adapter.registerInteractionHandler ( 'click', this.clickHandler_ )
	}
	
	destroy () {
		this.adapter.deregisterInteractionHandler ( 'click', this.clickHandler_ )
	}
	
	isToggled () {
		return this.adapter.getAttr ( 'aria-pressed' ) === 'true'
	}
	
	toggle ( isToggled = undefined ) {
		const wasToggledExplicitlySet = isToggled === Boolean ( isToggled )
		this.toggled_ = wasToggledExplicitlySet ? isToggled : ! this.toggled_
		this.spin = ''
		let toggleColor
		
		this.adapter.setAttr ( 'aria-pressed', String ( this.toggled_ ) )
		if ( this.toggled_ ) {
			toggleColor = 'Red'
			this.adapter.addClass ( 'redblue-toggle--toggled' )
		}
		else {
			toggleColor = 'Blue'
			this.adapter.removeClass ( 'redblue-toggle--toggled' )
		}
		this.adapter.setToggleColorTextContent ( toggleColor )
	}
}


class RedblueToggle extends MDCComponent {
	get toggled () {
		return this.foundations_.isToggled ()
	}
	
	set toggled ( toggled ) {
		this.foundation_.toggle ( toggled )
	}
	
	getDefaultFoundation () {
		return new RedblueToggleFoundation ( {
			getAttr: ( attr ) => this.root.getAttribute ( attr ),
			setAttr: ( attr, value ) => this.root.setAttribute ( attr, value ),
			addClass: ( className ) => this.root.classList.add ( className ),
			removeClass: ( className ) => this.root.classList.remove ( className ),
			setToggleColorTextContent: ( textContent ) => {
				this.root.querySelector ( '.redblue-toggle__color' ).textContent =
						textContent
			},
			registerInteractionHandler: ( type, handler ) =>
					this.root.addEventListener ( type, handler ),
			deregisterInteractionHandler: ( type, handler) =>
					this.root.removeEventListener ( type, handler )
		} )
	}
}


document.addEventListener ( 'DOMContentLoaded', ( event ) => {
	initCounter ()
	new RedblueToggle ( document.getElementById ( '1' ) )
} )
