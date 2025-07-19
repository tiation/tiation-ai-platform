import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const IntelligencePricing = () = {
  const [loading, setLoading] = useState({});

  const pricingPlans = [
    {
      name: "Starter AI",
      price: "$49",
      period: "/month",
      description: "Perfect for small businesses to get started with AI",
      features: [
        "AI-driven analytics",
        "Access to basic models",
        "1 user account",
        "Standard support",
        "Community access"
      ],
      priceId: "starter_ai_monthly",
      popular: false,
      gradient: "from-indigo-400/20 to-blue-600/20"
    },
    {
      name: "Professional AI",
      price: "$199",
      period: "/month",
      description: "Ideal for growing businesses needing advanced AI capabilities",
      features: [
        "Advanced AI tools",
        "Custom model training",
        "Multi-user access",
        "Priority support",
        "API access",
        "AI consulting"
      ],
      priceId: "professional_ai_monthly",
      popular: true,
      gradient: "from-green-400/20 to-cyan-600/20"
    },
    {
      name: "Enterprise AI",
      price: "$999",
      period: "/month",
      description: "For large enterprises requiring complete AI solutions",
      features: [
        "Full AI suite",
        "Unlimited users",
        "Dedicated AI expert",
        "24/7 enterprise support",
        "Custom integrations",
        "Advanced security"
      ],
      priceId: "enterprise_ai_monthly",
      popular: false,
      gradient: "from-red-400/20 to-purple-600/20"
    }
  ];

  const handleSubscribe = async (priceId, planName) = {
    setLoading({ ...loading, [priceId]: true });

    try {
      const stripe = await stripePromise;

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          mode: 'subscription',
        }),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error('Stripe checkout error:', result.error);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading({ ...loading, [priceId]: false });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('/assets/technology-grid.svg')] opacity-5">
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/10 via-transparent to-red-500/10">
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            AI Pricing Plans
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the right AI solution for your business needs with flexible pricing plans
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) = (
            <div
              key={index}
              className={`relative rounded-2xl bg-gradient-to-br ${plan.gradient} backdrop-blur-xl border border-gray-700/50 p-8 ${
                plan.popular
                  ? 'transform scale-105 border-blue-400/50 shadow-2xl shadow-blue-400/25'
                  : 'hover:scale-105'
              } transition-all duration-300 group`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-400 to-red-400 text-black px-6 py-2 rounded-full text-sm font-bold">
                    BEST VALUE
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                {plan.name}
                </h3>
                <p className="text-gray-400 mb-4">
                {plan.description}
                </p>
                <div className="flex items-baseline justify-center mb-6">
                  <span className="text-5xl font-bold text-white">
                  {plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">
                  {plan.period}
                  </span>
                </div>
              </div>

              ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) = (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">
                    {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() = handleSubscribe(plan.priceId, plan.name)}
                disabled={loading[plan.priceId]}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-400 to-red-400 text-black hover:from-cyan-300 hover:to-red-300 shadow-lg shadow-blue-400/25'
                    : 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600 hover:border-gray-500'
                } ${loading[plan.priceId] ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading[plan.priceId] ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2">
                    </div>
                  Processing...
                  </div>
                ) : (
                  `Get Started with ${plan.name}`
                )}
              </button>

              {plan.popular && (
                <p className="text-center text-sm text-gray-400 mt-4">
                  👥 Team collaboration included
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            All plans include 30-day money-back guarantee • Dedicated support
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>🔒 Enterprise-grade security</span>
            <span>🔗 Easy integrations</span>
            <span>🚀 Continuous updates</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligencePricing;

