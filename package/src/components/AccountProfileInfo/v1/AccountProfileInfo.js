import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import { addTypographyStyles, applyTheme } from "../../../utils";

const AccountProfileInfoContainer = styled.div`
  display: flex;
  position: relative;
`;

const AccountProfileInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const ViewerEmailText = styled.span`
  ${addTypographyStyles("ViewerInfoInitials", "labelText")}
  color: ${applyTheme("accountProfileInfoEmailFontColor")};
  font-size: ${applyTheme("accountProfileInfoEmailFontSize")};
  align-self: left;
  margin-bottom: 0.75rem;
  margin-left: 1.0rem;
`;

const ViewerNameText = styled.span`
  ${addTypographyStyles("ViewerInfoInitials", "labelText")}
  font-size: ${applyTheme("accountProfileInfoNameFontSize")};
  align-self: left;
  margin-bottom: 0.25rem;
  margin-left: 1.0rem;
`;

class AccountProfileInfo extends Component {
  static propTypes = {
    components: PropTypes.shape({
      Button: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      ProfileImage: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    }),
    /**
     * Enable this prop when you only want to display the Edit account link
     */
    editable: PropTypes.bool,
    /**
     * An object containing basic user information.
     */
    viewer: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      primaryEmailAddress: PropTypes.string.isRequired,
      profileImage: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    editable: false
  };

  /**
   *
   * @name viewerEmail
   * @summary Return viewer email address
   * @return {String} the viewers email address.
   */
  get viewerPrimaryEmailAddress() {
    const { viewer: { primaryEmailAddress } } = this.props;
    return primaryEmailAddress;
  }

  /**
   *
   * @name viewerName
   * @summary If `firstName` is availible on the `viewer` object
   * return that else return the email address
   * @return {String} the viewers name.
   */
  get viewerName() {
    const { viewer: { name } } = this.props;
    return name;
  }

  viewerProfileEditLink = () => {
    const { components: { Button }, editable } = this.props;

    if (editable) {
      return (
        <Button isShortHeight={true} isTextOnly={true}>Edit Account</Button>
      );
    }
    return null;
  }

  render() {
    const { components: { ProfileImage }, viewer } = this.props;

    return (
      <AccountProfileInfoContainer>
        <ProfileImage viewer={viewer} />
        <AccountProfileInfoTextContainer>
          <ViewerNameText>
            {this.viewerName}
          </ViewerNameText>
          <ViewerEmailText>
            {this.viewerPrimaryEmailAddress}
          </ViewerEmailText>
          {this.viewerProfileEditLink()}
        </AccountProfileInfoTextContainer>
      </AccountProfileInfoContainer>
    );
  }
}

export default withComponents(AccountProfileInfo);
