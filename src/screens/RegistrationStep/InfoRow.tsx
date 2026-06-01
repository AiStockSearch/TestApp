import StyledTextDescription from '@/components/atoms/Typography';
import { visibleInputs } from '@/screens/ProfileStep/ProfileStep';
import type { IRegistrationPayload } from '@/screens/ProfileStep/types';
import type { TRoleType } from '@/screens/RoleStep/screen';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

import { InfoRowContainer } from './styled';

const InfoRow = ({
  userInfo,
  role,
  listData,
}: {
  userInfo: IRegistrationPayload;
  role: TRoleType;
  listData: Record<string, string>;
}) => {
  return visibleInputs({
    ...userInfo,
    role: role,
  }).map((key) => {
    const value =
      userInfo[key as keyof IRegistrationPayload];
    if (
      value === '' ||
      value === null ||
      value === undefined
    ) {
      return null;
    }
    if (
      ['firstName', 'lastName', 'secondName'].includes(key)
    ) {
      return null;
    }

    return (
      <InfoRowContainer key={key}>
        <StyledTextDescription
          $fontSize={TextSize.medium}
          $fontWeight="300"
          $color={colors.text.primary}
          style={{ flex: 1, maxWidth: '60%' }}
        >
          {listData[key]}
        </StyledTextDescription>
        <StyledTextDescription
          $fontSize={TextSize.medium}
          $fontWeight="800"
          $color={colors.text.primary}
        >
          {(() => {
            if (typeof value === 'object') {
              return value.masked || '-';
            }
            return value || '-';
          })()}
        </StyledTextDescription>
      </InfoRowContainer>
    );
  });
};

export default InfoRow;
