import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { LEVEL_TEST_QUESTIONS, LINE_URL } from "@/lib/constants";

export default function LevelTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{level: string, score: number, recommendation: string} | null>(null);
  const { toast } = useToast();

  const handleAnswerSelect = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    if (currentAnswer === "") {
      toast({
        title: "กรุณาเลือกคำตอบ",
        description: "โปรดเลือกคำตอบก่อนไปข้อถัดไป",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(currentAnswer);
    setAnswers(newAnswers);
    setCurrentAnswer("");

    if (currentQuestion < LEVEL_TEST_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitTest(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCurrentAnswer(answers[currentQuestion - 1]?.toString() || "");
    }
  };

  const handleSubmitTest = async (finalAnswers: number[]) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/level-test", {
        userId: null,
        answers: finalAnswers.map((answer, index) => 
          answer === LEVEL_TEST_QUESTIONS[index].correct ? "correct" : "incorrect"
        )
      });
      
      const data = await response.json();
      setResult(data);
      
      toast({
        title: "ทดสอบเสร็จสิ้น!",
        description: `คุณอยู่ในระดับ ${data.level}`,
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งผลการทดสอบได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setCurrentAnswer("");
    setResult(null);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                  ผลการทดสอบ
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="bg-blue-50 rounded-xl p-8">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {result.level}
                  </div>
                  <div className="text-xl text-gray-600 mb-4">
                    คะแนน: {result.score}/{LEVEL_TEST_QUESTIONS.length}
                  </div>
                  <p className="text-lg text-gray-700">
                    {result.recommendation}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/pricing">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg">
                      ดูแพลนเรียน
                    </Button>
                  </Link>
                  <Button 
                    onClick={resetTest}
                    variant="outline"
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-4 rounded-lg font-semibold text-lg"
                  >
                    ทดสอบใหม่
                  </Button>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    ต้องการคำปรึกษาเพิ่มเติม?
                  </h4>
                  <p className="text-gray-600 mb-4">
                    ทีมงานของเราพร้อมให้คำแนะนำเกี่ยวกับแพลนการเรียนที่เหมาะกับคุณ
                  </p>
                  <a 
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    <i className="fab fa-line mr-2"></i>
                    ติดต่อผ่าน LINE
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ทดสอบระดับภาษาอังกฤษ
            </h1>
            <p className="text-xl text-gray-600">ทดสอบระดับ A1-A2 ฟรี เพื่อหาแพลนที่เหมาะกับคุณ</p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold">
                  ข้อที่ {currentQuestion + 1} จาก {LEVEL_TEST_QUESTIONS.length}
                </CardTitle>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {Math.round(((currentQuestion + 1) / LEVEL_TEST_QUESTIONS.length) * 100)}%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / LEVEL_TEST_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800">
                {LEVEL_TEST_QUESTIONS[currentQuestion].question}
              </h3>

              <RadioGroup value={currentAnswer} onValueChange={handleAnswerSelect}>
                {LEVEL_TEST_QUESTIONS[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between pt-4">
                <Button 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="px-8"
                >
                  ย้อนกลับ
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      กำลังประมวลผล...
                    </div>
                  ) : currentQuestion === LEVEL_TEST_QUESTIONS.length - 1 ? (
                    "ส่งคำตอบ"
                  ) : (
                    "ข้อต่อไป"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Level Test Benefits */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Student taking English level test online" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">ประโยชน์ที่ได้รับ</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fas fa-graduation-cap text-blue-600 text-xl mr-4 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-gray-800">เครดิตเรียนออนไลน์ 30 วัน</h4>
                    <p className="text-gray-600">เรียนด้วยตัวเองผ่านแพลตฟอร์มออนไลน์</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-video text-blue-600 text-xl mr-4 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-gray-800">เรียนสดสัปดาห์ละ 2 ชั่วโมง</h4>
                    <p className="text-gray-600">เรียนสดผ่าน Zoom กับครูเจ้าของภาษา</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-certificate text-blue-600 text-xl mr-4 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-gray-800">ใบเซอร์จากสถาบันระดับโลก</h4>
                    <p className="text-gray-600">รับรองมาตรฐาน CEFR ระดับสากล</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating LINE Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover-scale"
          aria-label="ติดต่อผ่าน LINE"
        >
          <i className="fab fa-line text-2xl"></i>
        </a>
      </div>
    </div>
  );
}
