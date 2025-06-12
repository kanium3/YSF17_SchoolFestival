import { TimetableDisplay } from "./timetableElements/timetableDisplay";
export const metadata = {
  title: "蒼煌祭17th非公式ページ｜タイムテーブル",
  description: "蒼煌祭17thの非公式のタイムテーブルのページです。",
};

export default function Program() {
  return (
    <div>
      <h1>時間割</h1>
      <div>
        <h2>ピックアップ</h2>
        <p>もうすぐ始まりそうな企画をランダムに表示します！</p>
        <div>スライド</div>
      </div>
      <div>
        <h2>タイムテーブル</h2>
        <TimetableDisplay />
      </div>
    </div>
  );
}
