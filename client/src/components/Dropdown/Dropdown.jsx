import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// @mui
import withStyles from "@material-ui/core/styles/withStyles";
import {MenuItem ,Button, MenuList, ClickAwayListener, Paper, Grow, Divider, Icon, Popper} from "@material-ui/core";

// style
import dropdownStyle from "../../styles/components/Dropdowns/dropdownStyle";

class CustomDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClick() {
    this.setState({ open: true });
    this.props.showSearchResults ? this.props.closeSearchResults() : null;
  }
  handleClose() {
    this.setState({ open: false });
  }
  render() {
    const { open } = this.state;
    const {
      classes,
      buttonText,
      buttonIcon,
      dropdownList,
      buttonProps,
      dropup,
      dropdownHeader,
      caret,
      hoverColor,
      left,
      rtlActive,
      noLiPadding
    } = this.props;
    const caretClasses = classNames({
      [classes.caret]: true,
      [classes.caretActive]: open,
      [classes.caretRTL]: rtlActive
    });
    const dropdownItem = classNames({
      [classes.dropdownItem]: true,
      [classes[hoverColor + "Hover"]]: true,
      [classes.noLiPadding]: noLiPadding,
      [classes.dropdownItemRTL]: rtlActive
    });
    let icon = null;
    switch (typeof buttonIcon) {
      case "function":
        icon = <this.props.buttonIcon className={classes.buttonIcon} />;
        break;
      case "string":
        icon = (
          <Icon className={classes.buttonIcon}>{this.props.buttonIcon}</Icon>
        );
        break;
      default:
        icon = null;
        break;
    }
    return (
      <div>
        <div>
          <Button
            aria-label="Notifications"
            aria-owns={open ? "menu-list" : null}
            aria-haspopup="true"
            {...buttonProps}
            buttonRef={node => {
              this.anchorEl = node;
            }}
            onClick={this.handleClick}
          >
            {icon}
            {buttonText !== undefined ? buttonText : null}
            {caret ? <b className={caretClasses} /> : null}
          </Button>
        </div>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          placement={
            dropup
              ? left ? "top-start" : "top"
              : left ? "bottom-start" : "bottom"
          }
          className={classNames({
            [classes.popperClose]: !open,
            [classes.pooperResponsive]: true
          })}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              in={open}
              id="menu-list"
              style={
                dropup
                  ? { transformOrigin: "0 100% 0" }
                  : { transformOrigin: "0 0 0" }
              }
            >
              <Paper className={classes.dropdown} square="true">
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList role="menu" className={classes.menuList}>
                    {dropdownHeader !== undefined ? (
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownHeader}
                      >
                        {dropdownHeader}
                      </MenuItem>
                    ) : null}
                    {dropdownList.map((prop, key) => {
                      if (prop.divider) {
                        return (
                          <Divider
                            key={key}
                            onClick={this.handleClose}
                            className={classes.dropdownDividerItem}
                          />
                        );
                      }
                      return (
                        <MenuItem
                          key={key}
                          onClick={this.handleClose}
                          className={dropdownItem}
                        >
                          {prop}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

CustomDropdown.defaultProps = {
  caret: true,
  hoverColor: "primary"
};

CustomDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  hoverColor: PropTypes.oneOf([
    "black",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ]),
  buttonText: PropTypes.node,
  buttonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  dropdownList: PropTypes.array,
  buttonProps: PropTypes.object,
  dropup: PropTypes.bool,
  dropdownHeader: PropTypes.node,
  rtlActive: PropTypes.bool,
  caret: PropTypes.bool,
  left: PropTypes.bool,
  noLiPadding: PropTypes.bool
};

export default withStyles(dropdownStyle)(CustomDropdown);
