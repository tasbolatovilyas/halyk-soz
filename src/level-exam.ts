export function levelExamResult<T extends string>(levels: readonly T[], level: T, age: string, examId: string, correct: number, total: number) {
  const index=levels.indexOf(level);
  const passed=age!=='child' && index>=0 && examId==='exam-'+level && total>0 && correct<=total && correct/total>=0.7;
  return {passed,next:passed?levels[index+1]:undefined};
}
