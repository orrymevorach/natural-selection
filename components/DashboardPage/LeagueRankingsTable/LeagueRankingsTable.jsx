import { ROUTES } from '@/utils/constants';
import styles from './LeagueRankingsTable.module.scss';
import tableStyles from '@/components/shared/Table/Table.module.scss';
import { useRouter } from 'next/router';
import Button from '@/components/shared/Button/Button';
import { useUser } from '@/context/user-context/user-context';
import clsx from 'clsx';
import InviteMemberTakeover from '@/components/DashboardPage/InviteMemberTakeover/InviteMemberTakeover';
import { useState } from 'react';
import { isEmpty } from '@/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function LeagueRankingsTable({ leagueData, sports }) {
  const router = useRouter();
  const user = useUser();
  const [showInviteMemberTakeover, setShowInviteMemberTakeover] =
    useState(false);

  const currentContest = sports?.find(
    ({ name }) => leagueData.sport[0] === name
  );

  const brackets = leagueData.json;
  const leagueAdmin = leagueData?.admin && leagueData.admin[0];
  const isAdmin = leagueAdmin && user.id === leagueAdmin;

  const titleHeadings = [
    { title: 'Rank', classNames: tableStyles.rank },
    { title: 'Team Name' },
    { title: 'Total Points' },
    { title: 'Correct Picks' },
  ];
  return (
    <>
      {showInviteMemberTakeover && (
        <InviteMemberTakeover
          setShowTakeover={setShowInviteMemberTakeover}
          leagueId={leagueData.id}
        />
      )}

      <div className={tableStyles.container}>
        <div className={tableStyles.topRow}>
          <p className={tableStyles.title}>
            {leagueData.name}{' '}
            <span
              className={styles.contestName}
              style={{
                color: currentContest?.color,
                WebkitTextStroke: currentContest?.textStrokeColor
                  ? `1px ${currentContest?.textStrokeColor}`
                  : '',
              }}
            >
              {leagueData.sport}
            </span>
          </p>
          {isAdmin && (
            <Button
              isPurple
              isSmall
              classNames={tableStyles.inviteButton}
              handleClick={() => setShowInviteMemberTakeover(true)}
            >
              Invite Member <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          )}
        </div>
        <div className={tableStyles.innerContainer}>
          <table className={tableStyles.table}>
            <thead>
              <tr className={tableStyles.titleRow}>
                {titleHeadings.map(({ title, classNames }, index) => {
                  const width =
                    index === 0 ? '' : `${100 / (titleHeadings.length - 1)}%`;
                  return (
                    <th key={title} className={classNames} style={{ width }}>
                      {title}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {brackets
                .sort((a, b) => {
                  let aRank = a.rankData?.rank;
                  let bRank = b.rankData?.rank;
                  if (aRank > bRank) return 1;
                  return -1;
                })
                .map(bracket => {
                  const { name, rankData, bracketName } = bracket;
                  const totalPoints = rankData?.totalPoints || 0;
                  const rank = rankData?.rank;
                  const numberOfWinners = rankData?.numberOfWinners || 0;
                  const correctPicks = rankData?.correctPicks || 0;

                  return (
                    <tr key={`row-${leagueData.id}-${name}`}>
                      <td className={tableStyles.rank}>
                        <p
                          className={tableStyles.number}
                          style={{
                            backgroundColor: currentContest?.color,
                          }}
                        >
                          {rank}
                        </p>
                      </td>
                      <td>
                        <p>{bracketName}</p>
                      </td>
                      <td>{totalPoints}</td>
                      <td>
                        {correctPicks}/{numberOfWinners}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className={tableStyles.buttonsContainer}>
            {brackets.map(bracket => {
              const isCurrentUsersBracket = user.brackets?.includes(bracket.id);
              const hasSelections = !isEmpty(bracket.selections);
              const buttonText = isCurrentUsersBracket
                ? 'Edit Bracket'
                : 'View Bracket';
              return (
                <div
                  className={tableStyles.buttonContainer}
                  key={`button-${bracket.id}-${bracket.name}`}
                >
                  {/* {isCurrentUsersBracket && ( */}
                  <Button
                    classNames={clsx(
                      tableStyles.button,
                      !hasSelections && tableStyles.pulse
                    )}
                    style={{
                      backgroundColor: currentContest?.color,
                      border: `1px solid ${currentContest?.color}`,
                    }}
                    handleClick={() =>
                      router.push({
                        pathname: `${
                          ROUTES.BRACKET_CHALLENGE
                        }/${leagueData.sport[0].toLowerCase()}`,
                        query: {
                          leagueId: leagueData.id,
                          bracketId: bracket.id,
                        },
                      })
                    }
                  >
                    {buttonText}
                  </Button>
                  {/* )} */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
