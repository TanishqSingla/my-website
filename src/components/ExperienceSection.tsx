import { cn } from '@/utils'
import type { PropsWithChildren } from 'preact/compat'
import { useState } from 'preact/hooks'

type Content = {
	heading: string
	subheading: string
	date: string
	imagePath?: string
	altText?: string
	imageClass?: string
}

const tldrContent = [
	{
		heading: 'Zomato',
		subheading: 'Software Developer Intern',
		date: 'Jul 2024 - Dec 2024',
		imagePath: '',
		altText: '',
		imageClass: 'h-12 w-auto md:-left-16',
		list: [
			'Joined Web Platform team, created and maintained interfaces and tools to enable teams',
			<>
				Built and broke stuff @{' '}
				<a href='https://weatherunion.com' class='text-foreground'>
					weatherunion.com
				</a>
			</>
		]
	},
	{
		heading: 'TradeIndia',
		subheading: 'Junior Software Developer',
		date: 'Jul 2023 - Jun 2024',
		imagePath: '',
		altText: '',
		imageClass: 'h-12 w-auto md:-left-16',
		list: [
			<>Helped migrating django monolith to microservices</>,
			<>Spun up search service in Golang from scratch</>
		]
	},
	{
		heading: 'Affordmed',
		subheading: 'Frontend Developer Intern',
		date: 'Jan 2023 - Jun 2023',
		imagePath: '',
		altText: '',
		imageClass: 'h-12 w-auto md:-left-16',
		list: [<>Built consumer facing e-commerce website and created admin panels</>]
	},
	{
		heading: 'Smallcase',
		subheading: 'Frontend Intern',
		date: 'Jan 2023 - Jun 2023',
		imagePath: '',
		altText: '',
		imageClass: 'h-12 w-auto md:-left-16',
		list: [
			<>
				Became a part of smallboard team, developed and maintained internal dashboards to enable
				teams to achieve their goals faster
			</>
		]
	}
]

const fullContent = [
	{
		heading: 'Zomato',
		subheading: 'Software Developer Intern',
		date: 'Jul 2024 - Dec 2024',
		imagePath: '',
		altText: '',
		imageClass: 'h-12 w-auto md:-left-16',
		list: [
			<>
				Redesigned the offer creation flow by introducing a scalable, config-driven system, achieved
				a 40% reduction in development time and improving time-to-market by 30%
			</>,
			<>
				Delivered a custom ad creation tool for the Operations team, achieving 500,000+ impressions
				within the first day and establishing a streamlined workflow for creating restaurant
				stories.
			</>,
			<>
				Enhanced website responsiveness, cutting LCP from over 4 seconds to under 2.5 seconds,
				meeting Google&apos;s Core Web Vitals thresholds and significantly improving the site&qpos;s
				SEO rankings
			</>,
			<>
				Improved overall site stability, achieving an INP reduction from 300ms to under 100ms,
				leading to better user retention.
			</>,
			<>
				Implemented a live location feature on Weatherunion's map, enabling users to access
				real-time weather insights based on their current location.
			</>,
			<>
				Redesigned API documentation, developed an interactive testing playground for Weatherunion's
				API, replacing static PDFs with an intuitive, user-friendly experience, enhancing developer
				onboarding and engagement.
			</>,
			<>
				Introduced headless polymorphic components, improving reusability, flexibility, and
				consistency across the codebase.
			</>
		]
	},
	{
		heading: 'TradeIndia',
		subheading: 'Junior Software Developer',
		date: 'Jul 2023 - Jun 2024',
		imagePath: '',
		altText: '',
		imageClass: 'h-12 w-auto md:-left-16',
		list: [
			<>
				Migrated the search microservice from Django to Golang, resulting in a 75% decrease in query
				latency and an 84% reduction in container size, driving operational efficiency and cost
				savings.
			</>,
			<>
				Rebuilt 3 FastAPI-based microservices in Node.js, cutting technical debt and enhancing
				performance upto 110% by parallelizing queries, leading to improved system throughput and
				reduced latency.
			</>,
			<>
				Written cron jobs to backfill data to Elasticsearch cache, fixing loading time of 200+ pages
				from 30s to 3s.
			</>,
			<>
				Created a table to support dynamic specifications data in Postgres. This helped vendors to
				provide better and diverse product information resulting in better SEO visibility.
			</>
		]
	},
	{
		heading: 'Affordmed',
		subheading: 'Frontend Developer Intern',
		date: 'Jan 2023 - Jun 2023',
		imagePath: '',
		altText: '',
		imageClass: 'h-12 w-auto md:-left-16',
		list: [
			<>
				Developed an automated vendor registration and onboarding flow, significantly reducing
				manual effort and support costs, while streamlining vendor activation.
			</>,
			<>
				Developed an automated vendor registration and onboarding flow, significantly reducing
				manual effort and support costs, while streamlining vendor activation.
			</>
		]
	},
	{
		heading: 'Smallcase',
		subheading: 'Frontend Intern',
		date: 'Jan 2023 - Jun 2023',
		imagePath: '',
		altText: '',
		imageClass: 'h-12 w-auto md:-left-16',
		list: [
			<>
				Automated lead distribution with a custom dashboard, reducing time spent on manual
				assignments by 1.5 hours/week and boosting team productivity by 65%.
			</>,
			<>
				Optimized the customer support table, implementing custom pagination logic that reduced load
				time by 90%, from 45 seconds to 4 seconds, improving operational efficiency
			</>
		]
	}
]

export default function ExperienceSection({ className }: { className?: string }) {
	const [tldr, setTldr] = useState(false)
	const [showMore, setShowMore] = useState(false)

	return (
		<section class={cn(className, 'flex flex-col gap-y-5 md:flex-row md:gap-y-0')}>
			<div class='md:w-1/3'>
				<h2 class='text-xl font-semibold '>Experience</h2>
				<div class='my-3 flex items-center gap-2'>
					<button
						onClick={() => setTldr(!tldr)}
						className={`flex h-5 w-10 items-center rounded-full border border-foreground transition-all duration-300 ${tldr ? 'bg-accent' : 'bg-background'}`}
					>
						<span
							class={cn(
								'ml-1 h-3 w-3 rounded-full bg-foreground shadow-md transition-all duration-300',
								{
									'ml-[60%] bg-accent-foreground': tldr
								}
							)}
						></span>
					</button>
					<span class='text-base'>TL;DR</span>
				</div>
				<a href='/resume.pdf'>View pdf</a>
			</div>
			<div class='flex flex-col gap-y-3 md:w-2/3'>
				{tldr
					? tldrContent.map(
							(content, index) =>
								(index < 2 || showMore) && (
									<ExperienceCard
										key={index}
										heading={content.heading}
										subheading={content.subheading}
										date={content.date}
									>
										<ul class='ml-4 list-disc text-muted-foreground'>
											{content.list.map((item, index) => (
												<li key={index}>{item}</li>
											))}
										</ul>
									</ExperienceCard>
								)
						)
					: fullContent.map(
							(content, index) =>
								(index < 2 || showMore) && (
									<ExperienceCard
										key={index}
										heading={content.heading}
										subheading={content.subheading}
										date={content.date}
									>
										<ul class='ml-4 list-disc text-muted-foreground'>
											{content.list.map((item, index) => (
												<li key={index}>{item}</li>
											))}
										</ul>
									</ExperienceCard>
								)
						)}

				<button onClick={() => setShowMore(!showMore)}>Show {showMore ? 'less' : 'more'}</button>
			</div>
		</section>
	)
}

const ExperienceCard = ({ heading, subheading, date, children }: PropsWithChildren<Content>) => {
	return (
		<div class={cn('relative rounded-2xl border border-border bg-primary-foreground px-5 py-3')}>
			<div class='flex flex-col gap-y-1.5'>
				<div class='flex flex-col gap-y-0.5'>
					<h1 class='text-lg font-medium'>{heading}</h1>
					<h2 class='text-muted-foreground'>{subheading}</h2>
					<h2 class='text-muted-foreground'>{date}</h2>
				</div>

				{children}
			</div>
		</div>
	)
}
