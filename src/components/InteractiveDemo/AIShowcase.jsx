import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon, CpuChipIcon } from '@heroicons/react/24/solid';

const AIShowcase = () => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const demos = [
    {
      id: 'ml-training',
      title: 'Machine Learning Training',
      description: 'Experience our advanced ML model training pipeline with real-time monitoring and optimization.',
      features: ['Auto-scaling Training', 'Model Optimization', 'Real-time Metrics', 'Version Control'],
      component: 'MLTrainingDemo',
      duration: 10000,
    },
    {
      id: 'data-processing',
      title: 'Data Processing Pipeline',
      description: 'Automated data ingestion, cleaning, and transformation for enterprise AI workflows.',
      features: ['ETL Operations', 'Data Quality Checks', 'Stream Processing', 'Batch Processing'],
      component: 'DataProcessingDemo',
      duration: 8000,
    },
    {
      id: 'ai-insights',
      title: 'AI-Powered Analytics',
      description: 'Advanced analytics dashboard with predictive modeling and business intelligence.',
      features: ['Predictive Analytics', 'Business Intelligence', 'Custom Reports', 'Real-time Dashboards'],
      component: 'InsightsDemo',
      duration: 9000,
    },
    {
      id: 'api-integration',
      title: 'API & Integration Hub',
      description: 'Seamless integration capabilities with enterprise systems and third-party APIs.',
      features: ['REST API', 'GraphQL', 'Webhooks', 'SDK Support'],
      component: 'APIDemo',
      duration: 6000,
    }
  ];

  const MLTrainingDemo = ({ isActive, step }) => (
    <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Training Interface */}
      <div className={`absolute top-4 left-4 right-4 transition-all duration-1000 ${isActive ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
        <div className="bg-gray-700/80 backdrop-blur-xl rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <CpuChipIcon className="w-8 h-8 text-cyan-400 animate-pulse" />
            <div className="flex-1">
              <div className="text-sm text-gray-300">Training Model: "Enterprise-NLP-v3"</div>
              <div className="text-xs text-cyan-400">Status: Training in progress</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-400 font-bold">87.3%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-pink-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: isActive && step >= 1 ? '73%' : '0%' }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Epoch 73/100</span>
              <span>ETA: 12m 34s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="absolute top-24 left-4 right-4 grid grid-cols-2 gap-4">
        {[
          { label: 'Loss', value: '0.234', trend: '↓', color: 'text-green-400' },
          { label: 'Validation', value: '0.156', trend: '↓', color: 'text-green-400' },
          { label: 'Learning Rate', value: '1e-4', trend: '→', color: 'text-blue-400' },
          { label: 'Batch Size', value: '512', trend: '→', color: 'text-purple-400' }
        ].map((metric, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r from-cyan-500/20 to-pink-500/20 backdrop-blur-xl rounded-xl p-3 border border-gray-600/50 transition-all duration-1000 delay-${index * 200} ${
              isActive && step >= index + 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-400">{metric.label}</div>
                <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
              </div>
              <div className={`text-xl ${metric.color}`}>{metric.trend}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Model Visualization */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className={`bg-gray-700/50 rounded-xl p-4 transition-all duration-1000 ${
          isActive && step >= 6 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-sm text-gray-300 mb-2">Neural Network Architecture</div>
          <div className="flex items-center justify-between">
            {['Input', 'Hidden', 'Hidden', 'Output'].map((layer, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 rounded-full border-2 ${
                  index === 0 ? 'border-cyan-400 bg-cyan-400/20' :
                  index === 3 ? 'border-pink-400 bg-pink-400/20' :
                  'border-purple-400 bg-purple-400/20'
                } flex items-center justify-center mb-1`}>
                  <div className="w-6 h-6 rounded-full bg-current opacity-50"></div>
                </div>
                <div className="text-xs text-gray-400">{layer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DataProcessingDemo = ({ isActive, step }) => (
    <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-3 h-full">
        {/* Data Ingestion */}
        <div className="p-6 border-r border-gray-600/50">
          <h3 className="text-white font-semibold mb-4 text-sm">Data Ingestion</h3>
          <div className="space-y-3">
            {[
              { name: 'Customer Data', status: 'processing', icon: '📊' },
              { name: 'Sales Records', status: 'completed', icon: '💰' },
              { name: 'Web Analytics', status: 'queued', icon: '🌐' }
            ].map((source, index) => (
              <div
                key={index}
                className={`bg-gray-700/50 rounded-lg p-3 transition-all duration-500 delay-${index * 300} ${
                  isActive && step >= index + 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{source.icon}</span>
                  <div className="flex-1">
                    <div className="text-xs text-gray-300">{source.name}</div>
                    <div className={`text-xs ${
                      source.status === 'completed' ? 'text-green-400' :
                      source.status === 'processing' ? 'text-yellow-400' : 'text-gray-500'
                    }`}>
                      {source.status}
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    source.status === 'completed' ? 'bg-green-400' :
                    source.status === 'processing' ? 'bg-yellow-400 animate-pulse' : 'bg-gray-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Pipeline */}
        <div className="p-6 border-r border-gray-600/50">
          <h3 className="text-white font-semibold mb-4 text-sm">ETL Pipeline</h3>
          <div className="space-y-4">
            {[
              { step: 'Extract', progress: 100 },
              { step: 'Transform', progress: 75 },
              { step: 'Load', progress: 45 }
            ].map((process, index) => (
              <div
                key={index}
                className={`transition-all duration-500 delay-${index * 400} ${
                  isActive && step >= index + 4 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{process.step}</span>
                  <span className="text-cyan-400">{process.progress}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-pink-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: isActive && step >= index + 4 ? `${process.progress}%` : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="p-6">
          <h3 className="text-white font-semibold mb-4 text-sm">Processed Data</h3>
          <div className="space-y-3">
            <div className={`bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg p-3 transition-all duration-500 ${
              isActive && step >= 7 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="text-lg font-bold text-green-400">2.4M</div>
              <div className="text-xs text-gray-400">Records Processed</div>
            </div>
            <div className={`bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-3 transition-all duration-500 delay-200 ${
              isActive && step >= 7 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="text-lg font-bold text-blue-400">99.7%</div>
              <div className="text-xs text-gray-400">Quality Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const InsightsDemo = ({ isActive, step }) => (
    <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden p-6">
      <div className="grid grid-cols-4 gap-4 h-full">
        {/* KPI Cards */}
        <div className="col-span-2 space-y-4">
          {[
            { label: 'Revenue Prediction', value: '$2.4M', change: '+15.3%', icon: '📈' },
            { label: 'Customer Retention', value: '94.2%', change: '+2.1%', icon: '👥' },
            { label: 'Market Share', value: '23.7%', change: '+0.8%', icon: '🎯' }
          ].map((kpi, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r from-cyan-500/20 to-pink-500/20 backdrop-blur-xl rounded-xl p-4 transition-all duration-500 delay-${index * 200} ${
                isActive && step >= index + 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{kpi.icon}</span>
                    <div className="text-sm text-gray-400">{kpi.label}</div>
                  </div>
                  <div className="text-xl font-bold text-white">{kpi.value}</div>
                </div>
                <div className="text-green-400 text-sm font-semibold">{kpi.change}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Visualization */}
        <div className="col-span-2">
          <div className={`bg-gray-700/50 rounded-xl p-4 h-full transition-all duration-1000 ${
            isActive && step >= 4 ? 'opacity-100' : 'opacity-0'
          }`}>
            <h3 className="text-white font-semibold mb-4 text-sm">Predictive Model Results</h3>
            <div className="relative h-32">
              {/* Mock Chart Lines */}
              <svg className="w-full h-full" viewBox="0 0 200 100">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00FFFF" />
                    <stop offset="100%" stopColor="#FF007F" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 80 Q 50 60 90 45 T 170 30"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  fill="none"
                  className={`transition-all duration-1000 ${
                    isActive && step >= 4 ? 'stroke-dasharray-none' : 'stroke-dasharray-[5,5]'
                  }`}
                />
                {[30, 60, 90, 120, 150].map((x, index) => (
                  <circle
                    key={index}
                    cx={x}
                    cy={80 - index * 12}
                    r="3"
                    fill="#00FFFF"
                    className={`transition-all duration-500 delay-${index * 200} ${
                      isActive && step >= 5 ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </svg>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="text-gray-400">Model Accuracy: <span className="text-cyan-400">96.8%</span></div>
              <div className="text-gray-400">Confidence: <span className="text-green-400">High</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const APIDemo = ({ isActive, step }) => (
    <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden p-6">
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* API Endpoints */}
        <div>
          <h3 className="text-white font-semibold mb-4">API Endpoints</h3>
          <div className="space-y-3">
            {[
              { method: 'GET', endpoint: '/api/v1/models', status: '200', color: 'text-green-400' },
              { method: 'POST', endpoint: '/api/v1/predict', status: '201', color: 'text-blue-400' },
              { method: 'PUT', endpoint: '/api/v1/train', status: '202', color: 'text-yellow-400' },
              { method: 'DELETE', endpoint: '/api/v1/model/{id}', status: '204', color: 'text-red-400' }
            ].map((api, index) => (
              <div
                key={index}
                className={`bg-gray-700/50 rounded-lg p-3 transition-all duration-500 delay-${index * 200} ${
                  isActive && step >= index + 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${api.color} bg-current bg-opacity-20`}>
                      {api.method}
                    </span>
                    <span className="text-gray-300 text-sm font-mono">{api.endpoint}</span>
                  </div>
                  <span className={`text-sm font-bold ${api.color}`}>{api.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response Example */}
        <div>
          <h3 className="text-white font-semibold mb-4">Response Example</h3>
          <div className={`bg-gray-900 rounded-lg p-4 h-64 overflow-auto transition-all duration-1000 ${
            isActive && step >= 5 ? 'opacity-100' : 'opacity-0'
          }`}>
            <pre className="text-xs text-gray-300 font-mono">
{`{
  "model_id": "ai-model-v3.2",
  "prediction": {
    "confidence": 0.967,
    "result": "positive",
    "probability": 0.89
  },
  "metadata": {
    "timestamp": "2024-01-15T10:30:00Z",
    "processing_time": "0.045s",
    "version": "v3.2.1"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDemoComponent = (componentName, isActive, step) => {
    switch (componentName) {
      case 'MLTrainingDemo':
        return <MLTrainingDemo isActive={isActive} step={step} />;
      case 'DataProcessingDemo':
        return <DataProcessingDemo isActive={isActive} step={step} />;
      case 'InsightsDemo':
        return <InsightsDemo isActive={isActive} step={step} />;
      case 'APIDemo':
        return <APIDemo isActive={isActive} step={step} />;
      default:
        return <div>Demo not found</div>;
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 8);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    let timeout;
    if (isPlaying) {
      timeout = setTimeout(() => {
        setCurrentDemo((prev) => (prev + 1) % demos.length);
        setAnimationStep(0);
      }, demos[currentDemo].duration);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, currentDemo, demos]);

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/assets/ai-grid.svg')] opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/5 via-transparent to-pink-500/5"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            AI Platform in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of our enterprise AI platform through interactive demonstrations
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Demo Navigation */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-wrap gap-2">
              {demos.map((demo, index) => (
                <button
                  key={demo.id}
                  onClick={() => {
                    setCurrentDemo(index);
                    setAnimationStep(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    currentDemo === index
                      ? 'bg-gradient-to-r from-cyan-400 to-pink-400 text-black'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {demo.title}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentDemo((prev) => (prev - 1 + demos.length) % demos.length)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-pink-400 text-black rounded-xl font-semibold hover:from-cyan-300 hover:to-pink-300 transition-all duration-300"
              >
                {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                <span>{isPlaying ? 'Pause' : 'Play'} Demo</span>
              </button>
              
              <button
                onClick={() => setCurrentDemo((prev) => (prev + 1) % demos.length)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Demo Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Demo Display */}
            <div className="lg:col-span-2">
              {renderDemoComponent(demos[currentDemo].component, isPlaying, animationStep)}
            </div>

            {/* Demo Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {demos[currentDemo].title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {demos[currentDemo].description}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Key Capabilities</h4>
                <ul className="space-y-2">
                  {demos[currentDemo].features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Demo Progress</span>
                  <span>{Math.round((animationStep / 7) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(animationStep / 7) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;
