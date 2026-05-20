import React, { useEffect } from 'react';
import { useAdminForm } from '../../hooks/useAdminForm';
import { Card, Input, Button } from '../components/AdminUI';

const StatsSettings = () => {
  const { data, loadData, handleChange, handleSave, loading } = useAdminForm({
    totalCompanies: 0,
    totalJobs: 0,
    bestGraduates: 0,
    activeIncubator: 0,
    currentJobs: 0,
    successfulGraduates: 0
  }, '/api/stats', { savePath: '', saveMethod: 'PUT' });

  useEffect(() => { loadData(); }, []);

  return (
    <Card title="📊 Инкубаторын статистик">
      <div className="settings-grid">
        <Input label="Нийт компани" type="number" value={data.totalCompanies} onChange={e => handleChange('totalCompanies', e.target.value)} />
        <Input label="Нийт ажлын байр" type="number" value={data.totalJobs} onChange={e => handleChange('totalJobs', e.target.value)} />
        <Input label="Шилдэг төгсөгч" type="number" value={data.bestGraduates} onChange={e => handleChange('bestGraduates', e.target.value)} />
        <Input label="Инкубаторт байрлаж буй" type="number" value={data.activeIncubator} onChange={e => handleChange('activeIncubator', e.target.value)} />
        <Input label="Одоогийн ажлын байр" type="number" value={data.currentJobs} onChange={e => handleChange('currentJobs', e.target.value)} />
        <Input label="Амжилттай төгсөгч" type="number" value={data.successfulGraduates} onChange={e => handleChange('successfulGraduates', e.target.value)} />
      </div>
      <Button onClick={() => handleSave()} loading={loading}>💾 Хадгалах</Button>
    </Card>
  );
};

export default StatsSettings;
