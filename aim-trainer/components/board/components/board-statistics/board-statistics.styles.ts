import styled from 'styled-components';

export const StyledBoardStatistics = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const BoardStatisticsTitle = styled.h2`
  margin-bottom: 30px;
  text-align: center;
`;

export const BoardStatisticsItems = styled.div`
  margin-bottom: 20px;
`;
