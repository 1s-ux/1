import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { GoogleGenAI } from "@google/genai";

// --- Icons ---
const Icons = {
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  BookOpen: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  Wrench: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.016a4.507 4.507 0 00-.84-2.43c-.326-.45-.755-.8-1.241-1.019-1.045-.469-2.293-.391-3.264.315m3.602 3.15c-.517.41-1.127.671-1.77.727M6.343 12.07c.395.495.842.94 1.332 1.333" />
    </svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  ),
  Play: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
  ),
  Pause: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
    </svg>
  ),
  Refresh: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  )
};

// --- Mock Data ---
const STUDENTS = [
  { id: 1, name: "김민준", points: 5, note: "숙제 제출 우수" },
  { id: 2, name: "이서연", points: 3, note: "수업 태도 양호" },
  { id: 3, name: "박지훈", points: -1, note: "지각 1회" },
  { id: 4, name: "최수아", points: 4, note: "발표 참여 활발" },
  { id: 5, name: "정현우", points: 2, note: "" },
  { id: 6, name: "강도윤", points: 0, note: "교과서 미지참" },
  { id: 7, name: "조예준", points: 6, note: "모둠 활동 리더" },
  { id: 8, name: "윤서윤", points: 3, note: "" },
];

const SCHEDULE = [
  { period: 1, time: "09:00 - 09:45", subject: "수학 (2-3반)", topic: "일차함수의 그래프" },
  { period: 2, time: "09:55 - 10:40", subject: "수학 (2-1반)", topic: "연립방정식 활용" },
  { period: 3, time: "10:50 - 11:35", subject: "공강", topic: "교재 연구 및 채점" },
  { period: 4, time: "11:45 - 12:30", subject: "동아리", topic: "코딩 탐구반" },
];

// --- Types ---
type Tab = "dashboard" | "students" | "lesson-planner" | "tools";

// --- Components ---

// 1. Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (t: Tab) => void }) => {
  const menuItems: { id: Tab; label: string; icon: any }[] = [
    { id: "dashboard", label: "대시보드", icon: Icons.Home },
    { id: "lesson-planner", label: "수업 준비 (AI)", icon: Icons.BookOpen },
    { id: "students", label: "학생 관리", icon: Icons.Users },
    { id: "tools", label: "학급 도구", icon: Icons.Wrench },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-10">
      <div className="p-6 border-b border-gray-100 flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <Icons.BookOpen />
        </div>
        <span className="font-bold text-xl text-gray-800">교사 쓱싹</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon />
            <span>{item.label}</span>
            {activeTab === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <div className="bg-indigo-900 rounded-xl p-4 text-white">
          <p className="text-xs text-indigo-200 uppercase font-semibold mb-1">PRO TIP</p>
          <p className="text-sm">Gemini AI를 활용해 퀴즈를 3초 만에 만드세요!</p>
        </div>
      </div>
    </div>
  );
};

// 2. Dashboard View
const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">안녕하세요, 김선생님! 👋</h1>
        <p className="text-gray-500 mt-1">오늘도 활기찬 하루 되세요. 오늘의 일정입니다.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Widget 1: Schedule */}
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg text-gray-800">오늘의 시간표</h2>
            <span className="text-sm text-gray-400">{new Date().toLocaleDateString('ko-KR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="space-y-4">
            {SCHEDULE.map((item) => (
              <div key={item.period} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-16 flex flex-col items-center justify-center bg-indigo-50 text-indigo-700 rounded-lg py-2">
                  <span className="font-bold text-lg">{item.period}교시</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.subject}</h3>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {item.topic}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Quick Notices */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg text-gray-800 mb-4">학사 일정 / 메모</h2>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <span className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <div>
                <p className="text-sm font-medium text-gray-900">중간고사 문제 출제 마감</p>
                <p className="text-xs text-gray-500">D-3 (이번 주 금요일까지)</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-2 h-2 mt-2 rounded-full bg-yellow-500 flex-shrink-0"></span>
              <div>
                <p className="text-sm font-medium text-gray-900">학부모 상담 주간</p>
                <p className="text-xs text-gray-500">다음 주 월요일 시작</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0"></span>
              <div>
                <p className="text-sm font-medium text-gray-900">교직원 회의</p>
                <p className="text-xs text-gray-500">오늘 오후 3:30</p>
              </div>
            </li>
          </ul>
          <button className="w-full mt-6 py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors">
            + 메모 추가하기
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Lesson Planner (AI)
const LessonPlanner = () => {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("중학교 2학년");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [generatedType, setGeneratedType] = useState<"plan" | "quiz">("plan");

  const generateContent = async () => {
    if (!subject || !topic) return alert("과목과 주제를 입력해주세요.");

    setLoading(true);
    setResult("");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      
      let prompt = "";
      if (generatedType === "plan") {
        prompt = `
          당신은 노련한 중학교 교사입니다. 다음 정보를 바탕으로 45분 수업 지도안을 작성해주세요.
          한국어로 작성하고, 마크다운 형식을 사용하여 가독성 있게 표현해주세요.

          대상: ${grade}
          과목: ${subject}
          주제: ${topic}

          포함할 내용:
          1. 학습 목표 (3가지)
          2. 도입 (5분) - 흥미 유발 질문 포함
          3. 전개 (30분) - 핵심 개념 설명 및 활동
          4. 정리 및 평가 (10분) - 형성 평가 질문 2개 포함
          5. 과제 또는 심화 학습 제안
        `;
      } else {
        prompt = `
          당신은 중학교 교사입니다. 다음 주제에 대해 학생들의 이해도를 확인할 수 있는 객관식 퀴즈 5문제를 만들어주세요.
          
          대상: ${grade}
          과목: ${subject}
          주제: ${topic}

          형식:
          문제 1. [문제 내용]
          ① [선택지]
          ② [선택지]
          ③ [선택지]
          ④ [선택지]
          ⑤ [선택지]
          
          정답 및 해설:
          1. [정답] - [해설]
        `;
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview",
        contents: prompt,
      });

      setResult(response.text || "결과를 생성하지 못했습니다.");
    } catch (error) {
      console.error(error);
      setResult("오류가 발생했습니다. API 키를 확인하거나 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-indigo-600"><Icons.Sparkles /></span>
          AI 수업 준비 도우미
        </h1>
        <p className="text-gray-500 mt-1">주제만 입력하면 수업 지도안과 퀴즈를 뚝딱 만들어드립니다.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 bg-indigo-50 border-b border-indigo-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">학년</label>
              <select 
                value={grade} 
                onChange={(e) => setGrade(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
              >
                <option>중학교 1학년</option>
                <option>중학교 2학년</option>
                <option>중학교 3학년</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">과목</label>
              <input 
                type="text" 
                placeholder="예: 수학, 역사, 과학"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">주제/단원</label>
              <input 
                type="text" 
                placeholder="예: 피타고라스의 정리"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
              />
            </div>
          </div>
          
          <div className="mt-4 flex gap-3">
             <button 
              onClick={() => { setGeneratedType("plan"); setTimeout(generateContent, 0); }} // Hack to ensure state update if needed, but here actually better to just call a wrapper or separate effect. Simplified for this demo.
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm flex justify-center items-center gap-2"
              onClickCapture={() => setGeneratedType("plan")}
             >
               <Icons.BookOpen /> 수업 지도안 생성
             </button>
             <button 
              onClick={() => { setGeneratedType("quiz"); }}
              onClickCapture={() => { setGeneratedType("quiz"); setTimeout(generateContent, 0); }} // Quick trigger
              className="flex-1 bg-white text-indigo-600 border border-indigo-200 py-2.5 rounded-lg font-medium hover:bg-indigo-50 transition shadow-sm flex justify-center items-center gap-2"
             >
               <Icons.Sparkles /> 퀴즈 문제 생성
             </button>
          </div>
        </div>

        <div className="min-h-[400px] p-8 bg-white relative">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium animate-pulse">Gemini가 열심히 수업 자료를 만들고 있어요...</p>
            </div>
          ) : result ? (
             <div className="prose prose-indigo max-w-none prose-headings:font-bold prose-h2:text-indigo-700 prose-strong:text-indigo-900 prose-li:marker:text-indigo-400">
               <h3 className="text-xl font-bold text-gray-400 mb-4 border-b pb-2">
                 {generatedType === "plan" ? "📄 수업 지도안" : "📝 퀴즈 문제"}
               </h3>
               <div className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                  {result}
               </div>
             </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Icons.Sparkles />
              </div>
              <p>위 내용을 입력하고 버튼을 눌러보세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 4. Student Management
const StudentManager = () => {
  const [students, setStudents] = useState(STUDENTS);

  const updatePoints = (id: number, delta: number) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, points: s.points + delta } : s));
  };

  return (
    <div className="animate-fade-in">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">학생 관리 (2-3반)</h1>
          <p className="text-gray-500 mt-1">상벌점 관리 및 특이사항 메모</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
          + 학생 추가
        </button>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">이름</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">상벌점 현황</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">특이사항</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updatePoints(student.id, -1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                    >-</button>
                    <span className={`w-8 text-center font-bold ${student.points > 0 ? 'text-indigo-600' : student.points < 0 ? 'text-red-600' : 'text-gray-400'}`}>
                      {student.points}
                    </span>
                    <button 
                      onClick={() => updatePoints(student.id, 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                    >+</button>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {student.note || <span className="text-gray-300 italic">특이사항 없음</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-indigo-600">수정</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 5. Classroom Tools
const ClassroomTools = () => {
  const [timeLeft, setTimeLeft] = useState(0); // seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [pickedStudent, setPickedStudent] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startTimer = (min: number) => {
    setTimeLeft(min * 60);
    setTimerRunning(true);
  };

  // Random Picker logic
  const pickRandomStudent = () => {
    setIsPicking(true);
    setPickedStudent(null);
    let count = 0;
    const interval = setInterval(() => {
      const random = STUDENTS[Math.floor(Math.random() * STUDENTS.length)];
      setPickedStudent(random.name);
      count++;
      if (count > 15) {
        clearInterval(interval);
        setIsPicking(false);
      }
    }, 100);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">학급 도구함</h1>
        <p className="text-gray-500 mt-1">수업 진행에 필요한 간단한 도구들입니다.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timer Tool */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-lg font-bold text-gray-700 mb-6">집중 타이머</h2>
          <div className={`text-7xl font-mono font-bold mb-8 ${timeLeft < 10 && timeLeft > 0 ? 'text-red-500 animate-pulse' : 'text-gray-800'}`}>
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex gap-3 mb-6">
            {[1, 3, 5, 10].map(min => (
              <button 
                key={min}
                onClick={() => startTimer(min)}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                {min}분
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setTimerRunning(!timerRunning)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition ${timerRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {timerRunning ? <><Icons.Pause /> 일시정지</> : <><Icons.Play /> 시작</>}
            </button>
            <button 
              onClick={() => { setTimerRunning(false); setTimeLeft(0); }}
              className="px-6 py-3 rounded-full bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
            >
              초기화
            </button>
          </div>
        </div>

        {/* Random Picker Tool */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-lg font-bold text-gray-700 mb-6">발표자 뽑기</h2>
          
          <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
            <div className={`text-4xl font-bold transition-all duration-100 ${isPicking ? 'text-gray-400 scale-90' : 'text-indigo-600 scale-110'}`}>
              {pickedStudent || "?"}
            </div>
            {isPicking && (
              <div className="absolute inset-0 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>
            )}
          </div>

          <button 
            onClick={pickRandomStudent}
            disabled={isPicking}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icons.Refresh />
            {isPicking ? "추첨 중..." : "누가 발표할까요?"}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
const App = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "students" && <StudentManager />}
          {activeTab === "lesson-planner" && <LessonPlanner />}
          {activeTab === "tools" && <ClassroomTools />}
        </div>
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);