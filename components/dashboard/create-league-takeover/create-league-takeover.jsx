import { useState } from 'react';
import { createLeague } from '@/lib/airtable';
import { useUser } from 'context/user-context/user-context';
import { ROUTES } from '@/utils/constants';
import LeagueTakeoverLayout from '@/components/shared/league-takeover-layout/league-takeover-layout';

export default function CreateLeagueTakeover({ setShowTakeover }) {
  const [leagueName, setLeagueName] = useState('');
  const user = useUser();

  const handleSubmit = async e => {
    const response = await createLeague({
      name: leagueName,
      memberRecordId: user.id,
    });
    window.location = `${ROUTES.LEAGUE}/${response.id}?leagueId=${response.id}`;
  };

  return (
    <LeagueTakeoverLayout
      setShowTakeover={setShowTakeover}
      handleSubmit={handleSubmit}
      title="Create League"
      label="Enter a name for your league"
      buttonLabel="Create League"
      inputValue={leagueName}
      setInputValue={setLeagueName}
    />
  );
}
