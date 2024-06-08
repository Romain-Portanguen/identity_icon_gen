import React from "react";
import styled from "styled-components";
import { getUserInfos } from '../utils/profile-utils';

const InfoList = styled.ul`
  list-style: none;
  margin: 10px 0;
  padding: 0;
  text-align: left;
`;

const InfoItem = styled.li`
  align-items: center;
  color: #b0b0b0;
  display: flex;
  font-size: 14px;
  margin: 5px 0;

  svg {
    margin-right: 8px;
    color: #ffffff;
  }
`;

export const UserData: React.FC<{ infos: ReturnType<typeof getUserInfos> }> = ({ infos }) => (
  <InfoList>
    {infos.slice(0, 5).map((info, index) => (
      <InfoItem key={index}>
        {
          info.followersSectionIcon ||
          info.companySectionIcon ||
          info.locationSectionIcon ||
          info.joinedSectionIcon
        }
        {
          info.followersSectionContent ||
          info.companySectionContent ||
          info.locationSectionContent ||
          info.joinedSectionContent
        }
      </InfoItem>
    ))}
  </InfoList>
);