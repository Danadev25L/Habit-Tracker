import Trainings from "@/components/training-section";

export default function TrainingPage() {
  return (
    <div className="py-6">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        Training Activities
      </h2>
      <Trainings />
    </div>
  );
}
