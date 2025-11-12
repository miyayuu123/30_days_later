import React, { useState } from 'react';

interface OnboardingData {
  name: string;
  googleConnected: boolean;
  faceImage: string | null;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    googleConnected: false,
    faceImage: null
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return data.name.trim().length > 0;
      case 2: return true; // Google connection is optional
      case 3: return data.faceImage !== null;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-warm-brown flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-warm-cream font-light font-acoustic">Step {currentStep} of {totalSteps}</span>
            <span className="text-warm-brown text-sm">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-warm-brown/30 rounded-full h-2">
            <div 
              className="bg-soft-orange h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="acoustic-card min-h-[400px] flex flex-col">
          {currentStep === 1 && (
            <NameStep 
              name={data.name}
              onChange={(name) => setData({ ...data, name })}
            />
          )}
          
          {currentStep === 2 && (
            <GoogleStep 
              connected={data.googleConnected}
              onChange={(googleConnected) => setData({ ...data, googleConnected })}
            />
          )}
          
          {currentStep === 3 && (
            <FaceUploadStep 
              image={data.faceImage}
              onChange={(faceImage) => setData({ ...data, faceImage })}
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-auto pt-6">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-2 text-warm-brown hover:text-soft-orange disabled:opacity-50 disabled:cursor-not-allowed font-light transition-colors"
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="px-6 py-3 bg-soft-orange hover:bg-soft-orange/80 text-warm-cream rounded-lg font-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === totalSteps ? 'Start Journey' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NameStepProps {
  name: string;
  onChange: (name: string) => void;
}

const NameStep: React.FC<NameStepProps> = ({ name, onChange }) => {
  return (
    <div className="flex-1">
      <h2 className="text-2xl font-light text-warm-cream mb-2 font-acoustic">
        What's your name?
      </h2>
      <p className="text-warm-brown/80 mb-8 font-light">
        Let's personalize your 30-day journey
      </p>
      
      <input
        type="text"
        value={name}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your name..."
        className="w-full px-4 py-3 bg-warm-cream/90 border border-warm-brown/30 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-soft-orange font-light"
        autoFocus
      />
    </div>
  );
};

interface GoogleStepProps {
  connected: boolean;
  onChange: (connected: boolean) => void;
}

const GoogleStep: React.FC<GoogleStepProps> = ({ connected, onChange }) => {
  const handleConnect = () => {
    // Simulate Google Calendar connection
    setTimeout(() => {
      onChange(true);
    }, 1000);
  };

  return (
    <div className="flex-1">
      <h2 className="text-2xl font-light text-warm-cream mb-2 font-acoustic">
        Connect your calendar
      </h2>
      <p className="text-warm-brown/80 mb-8 font-light">
        We'll use your schedule to create realistic scenarios
      </p>
      
      {!connected ? (
        <div className="space-y-4">
          <button
            onClick={handleConnect}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 border border-warm-brown/30 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-warm-cream" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-warm-cream font-light">Connect Google Calendar</span>
          </button>
          
          <button
            onClick={() => onChange(false)}
            className="w-full px-6 py-3 text-warm-brown/80 hover:text-warm-cream font-light transition-colors"
          >
            Skip for now
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-muted-green font-light">Calendar connected successfully!</p>
        </div>
      )}
    </div>
  );
};

interface FaceUploadStepProps {
  image: string | null;
  onChange: (image: string | null) => void;
}

const FaceUploadStep: React.FC<FaceUploadStepProps> = ({ image, onChange }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1">
      <h2 className="text-2xl font-light text-warm-cream mb-2 font-acoustic">
        Upload your photo
      </h2>
      <p className="text-warm-brown/80 mb-8 font-light">
        We'll use this to personalize your video experience
      </p>
      
      <div className="space-y-6">
        {!image ? (
          <label className="block">
            <div className="w-full h-48 border-2 border-dashed border-warm-brown/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-soft-orange/50 transition-colors">
              <svg className="w-12 h-12 text-warm-brown/60 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
              </svg>
              <p className="text-warm-brown/80 font-light">Click to upload your photo</p>
              <p className="text-warm-brown/60 text-sm font-light">PNG, JPG up to 10MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-soft-orange">
              <img src={image} alt="Uploaded face" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => onChange(null)}
              className="text-warm-brown/80 hover:text-soft-orange font-light transition-colors"
            >
              Change photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;